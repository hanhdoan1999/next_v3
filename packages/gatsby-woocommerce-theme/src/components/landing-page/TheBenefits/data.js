import QuoteHours from '../../icons/QuoteHours';
import FreeDeliverIcon from '../../icons/FreeDeliverIcon';
import WarrantyIcon from '../../icons/WarrantyIcon';
import SeatingIcon from '../../icons/SeatingIcon';
import FinanceIcon from '../../icons/FinanceIcon';
import LeadTimeIcon from '../../icons/LeadTimeIcon';

const LIST_BENEFITS = [
  {
    id: 1,
    name: '24-Hour Quotes',
    iconComponent: QuoteHours,
    des: 'If we have the items in stock, we will dispatch the same or next day from receipt of payment.',
    slug: '/services',
  },
  {
    id: 2,
    name: 'Free Delivery',
    des: 'For customers in metropolitan Sydney, Melbourne and Brisbane and lowest possible delivery outside these areas.',
    iconComponent: FreeDeliverIcon,
    slug: '/finance',
  },
  {
    id: 3,
    name: '5 Year Warranty',
    des: 'The majority of our products come with 5+ years structural warranty for manufacturing faults & defects',
    iconComponent: WarrantyIcon,
    slug: '/10-year-warranty',
  },
  {
    id: 4,
    name: 'Seating Layouts',
    des: 'From planning and designing, to selection and ordering, delivery and assembly, and after-sales support.',
    iconComponent: SeatingIcon,
    slug: '/huge-stocks',
  },
  {
    id: 5,
    name: 'Flexible Finance',
    des: `We're a registered SilverChef dealer, offering flexible financial options to reduce your up-front costs.`,
    iconComponent: FinanceIcon,
    slug: '/finance',
  },
  {
    id: 6,
    name: 'Short Lead Times',
    des: 'We keep a large volumes of stock on hand to keep lead times short.',
    iconComponent: LeadTimeIcon,
    slug: '/services',
  },
];

export default LIST_BENEFITS;
