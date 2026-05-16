import { 
  DashboardSquareAddIcon, 
  LicenseDraftIcon,
} from '@hugeicons/core-free-icons';
import { Outlet } from 'react-router-dom';

function DashboardPage() {
  return <h1>Home</h1>;
}

function ServiceOrdersLayout() {
  return (
    <Outlet />
  )
}
function ServiceOrdersPage() {
  return <h1>Ordens de Serviço</h1>
}

function CreateServiceOrderPage() {
  return <h1>Criar ordem de serviço</h1>
}

function ServiceOrderDetailsPage() {
  return <h1>Detalhes da ordem de serviço</h1>
}

export const routes = [
  {
    path: "/",
    label: "Home",
    icon: DashboardSquareAddIcon,
    element: <DashboardPage />,
  },
  {
    path: "/ordens-servico",
    label: "Ordens de Serviço",
    icon: LicenseDraftIcon,
    element: <ServiceOrdersLayout />,

    children: [
      {
        index: true,
        hidden: true,
        element: <ServiceOrdersPage />
      },
      {
        path: "nova",
        label: "Criar OS",
        element: <CreateServiceOrderPage />
      },
      { 
        path: ":id",
        hidden: true,
        element: <ServiceOrderDetailsPage />
      },
    ],
  },
]