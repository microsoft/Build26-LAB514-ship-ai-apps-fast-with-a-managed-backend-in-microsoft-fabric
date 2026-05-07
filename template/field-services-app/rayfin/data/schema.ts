import { ServicePro } from './ServicePro.js';
import { WorkOrder } from './WorkOrder.js';

export type FieldServiceSchema = {
  ServicePro: ServicePro;
  WorkOrder: WorkOrder;
};

export const schema = [ServicePro, WorkOrder];
