import { connection } from "../../../infra/database/Connection";

export default class GetOpportuntiesUseCase {
  constructor() {}

  async execute(): Promise<any[]> {
    return connection.$queryRawUnsafe(`
        SELECT customerCar.Chassi, Name, Plate, Model, Year_Fab, Year_Mod, Color, KM, KM_Dt, Dt_Sales, Dt_Warranty_Start, Dt_Warranty_End , Value_Purchase, Brand, Family, Cpf_Cnpj, Id_Category,

        (SELECT code
        FROM tb_Opportunity_Customer_Car LEFT OUTER JOIN tb_Opportunity_Type ON tb_Opportunity_Customer_Car.Id_Opportunity_Type = tb_Opportunity_Type.Id
        WHERE tb_Opportunity_Customer_Car.Chassi = customerCar.Chassi AND Id_Opportunity_Type = 1 ) as Alert ,
        (SELECT code
        FROM tb_Opportunity_Customer_Car LEFT OUTER JOIN tb_Opportunity_Type ON tb_Opportunity_Customer_Car.Id_Opportunity_Type = tb_Opportunity_Type.Id
        WHERE tb_Opportunity_Customer_Car.Chassi = customerCar.Chassi AND Id_Opportunity_Type = 2) as Upgrade ,
        (SELECT code
        FROM tb_Opportunity_Customer_Car LEFT OUTER JOIN tb_Opportunity_Type ON tb_Opportunity_Customer_Car.Id_Opportunity_Type = tb_Opportunity_Type.Id
        WHERE tb_Opportunity_Customer_Car.Chassi = customerCar.Chassi AND Id_Opportunity_Type = 3) as Service,
        (SELECT code
        FROM tb_Opportunity_Customer_Car LEFT OUTER JOIN tb_Opportunity_Type ON tb_Opportunity_Customer_Car.Id_Opportunity_Type = tb_Opportunity_Type.Id
        WHERE tb_Opportunity_Customer_Car.Chassi = customerCar.Chassi AND Id_Opportunity_Type = 4)  as Pending,
        (SELECT code
        FROM tb_Opportunity_Customer_Car LEFT OUTER JOIN tb_Opportunity_Type ON tb_Opportunity_Customer_Car.Id_Opportunity_Type = tb_Opportunity_Type.Id
        WHERE tb_Opportunity_Customer_Car.Chassi = customerCar.Chassi AND Id_Opportunity_Type = 7) as DelayedService,
        (SELECT code
        FROM tb_Opportunity_Customer_Car LEFT OUTER JOIN tb_Opportunity_Type ON tb_Opportunity_Customer_Car.Id_Opportunity_Type = tb_Opportunity_Type.Id
        WHERE tb_Opportunity_Customer_Car.Chassi = customerCar.Chassi AND Id_Opportunity_Type = 8)  as NoWarranty,
        (SELECT code
        FROM tb_Opportunity_Customer_Car LEFT OUTER JOIN tb_Opportunity_Type ON tb_Opportunity_Customer_Car.Id_Opportunity_Type = tb_Opportunity_Type.Id
        WHERE tb_Opportunity_Customer_Car.Chassi = customerCar.Chassi AND Id_Opportunity_Type = 9) as Orphan


        FROM tb_Customer_Car as customerCar

        INNER JOIN tb_Opportunity_Customer_Car as AnyOP ON customerCar.Chassi = AnyOP.Chassi

        GROUP BY customerCar.Chassi, Name, Plate, Model, Year_Fab, Year_Mod, Color, KM, KM_Dt, Dt_Sales, Dt_Warranty_Start, Dt_Warranty_End ,Value_Purchase, Brand, Family, Cpf_Cnpj, Id_Category
    `);
  }
}
