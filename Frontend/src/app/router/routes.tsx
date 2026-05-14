import { 
  DashboardSquareAddIcon, 
  LicenseDraftIcon,
} from '@hugeicons/core-free-icons';

function DashboardPage() {
  return <h1>Home</h1>;
}

function ServiceOrdersPage() {
  return <h1>Ordens de Serviço</h1>
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
    element: <ServiceOrdersPage />
  }
]