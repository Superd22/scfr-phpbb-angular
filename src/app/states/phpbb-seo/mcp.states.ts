import { McpComponent } from '../../components/mcp/mcp.component';

export const mcpStates = [
    {
        name: 'phpbb.seo.mcp',
        url: '/mcp/?i&mode&start&action&quickmod&t',
        params: {
            mode: null,
            i: null,
            start: null,
            redirect: null,
        },
        component: McpComponent,
    }
]