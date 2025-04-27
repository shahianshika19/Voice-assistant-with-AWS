import { Toast as ToastType } from './ui/use-toast'

export function Toast({ toast }: { toast: ToastType | null }) {
  if (!toast) return null

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
      toast.variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
    }`}>
      <h3 className="font-bold">{toast.title}</h3>
      {toast.description && <p>{toast.description}</p>}
    </div>
  )
}

