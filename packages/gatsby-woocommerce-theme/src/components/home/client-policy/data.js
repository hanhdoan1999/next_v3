import FreeShipping from '../../icons/FreeShipping';
import FinanceAvailable from '../../icons/FinanceAvailable';
import WarrantyGuarantee from '../../icons/WarrantyGuarantee';
import LargeStockHoldings from '../../icons/LargeStockHoldings';
import ProductSourcing from '../../icons/ProductSourcing';
import Installation from '../../icons/Installation';

const POLICY_LIST = [
  {
    id: 1,
    name: 'Free Shipping',
    iconComponent: FreeShipping,
    slug: '/shipping',
  },
  {
    id: 2,
    name: 'Large Stock Holdings',
    iconComponent: LargeStockHoldings,
    slug: '/huge-stocks',
  },
  {
    id: 3,
    name: 'Warranty Guarantee',
    iconComponent: WarrantyGuarantee,
    slug: '/10-year-warranty',
  },
  {
    id: 4,
    name: 'Finance Available',
    iconComponent: FinanceAvailable,
    slug: '/finance',
  },
  {
    id: 5,
    name: 'Product Sourcing',
    iconComponent: ProductSourcing,
    slug: '/services',
  },
  {
    id: 6,
    name: 'Assembly & Installation',
    iconComponent: Installation,
    slug: '/services',
  },
];

export default POLICY_LIST;
