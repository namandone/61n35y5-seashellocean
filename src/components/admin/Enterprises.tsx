import Sidebar from './Sidebar'

interface Props {
  onLogout: () => void
}

export default function Enterprises({ onLogout }: Props) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar active="enterprises" onNavigate={() => {}} />
      <main className="flex-1 bg-[var(--color-bg-muted)] overflow-y-auto" />
    </div>
  )
}
