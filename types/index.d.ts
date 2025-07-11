import { App } from 'vue';
import { CommonTable, CommonForm, CommonQuery } from './castor-antd';
import CaCommonTable from '../packages/CaCommonTable';
import CaCommonForm from '../packages/CaCommonForm';
import CaCommonQuery from '../packages/CaCommonQuery';

declare const CastorAntdv: {
  version: string;
  install: (app: App) => void;
  CaCommonTable: typeof CaCommonTable;
  CaCommonForm: typeof CaCommonForm;
  CaCommonQuery: typeof CaCommonQuery;
};

export {
  CaCommonTable,
  CaCommonForm,
  CaCommonQuery,
  CommonTable,
  CommonForm,
  CommonQuery
};

export default CastorAntdv; 