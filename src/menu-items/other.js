// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: 'Dashboard',
            type: 'item',
            url: '',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'cve',
            title: 'CVE',
            type: 'item',
            url: '/cve',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'product',
            title: 'Products',
            type: 'item',
            url: '/product',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        }
    ]
};

export default other;
