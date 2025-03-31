import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '', loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent), children: [
            { path: 'pedidos', loadComponent: () => import('./features/pedidos/pedidos.component').then(c => c.PedidosComponent) },
            { path: 'pedidos/form/:id', loadComponent: () => import('./features/pedidos/form-pedido/form-pedido.component').then(c => c.FormPedidoComponent) },
            { path: 'teses/form/:id', loadComponent: () => import('./features/pedidos/form-tese/form-tese.component').then(c => c.FormTeseComponent) },
            { path: 'propriedades', loadComponent: () => import('./features/propriedades/propriedades.component').then(c => c.PropriedadesComponent) },
            { path: 'questionario/:id', loadComponent: () => import('./features/questionario/questionario.component').then(c => c.QuestionarioComponent) },
            { path: '', redirectTo: 'pedidos', pathMatch: 'full' }
        ]
    }
];
