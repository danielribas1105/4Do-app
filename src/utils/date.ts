export function isoToDisplay(iso: string): string {
   if (!iso) return ""
   const d = new Date(iso)
   const dd = String(d.getDate()).padStart(2, "0")
   const mm = String(d.getMonth() + 1).padStart(2, "0")
   const yyyy = String(d.getFullYear())
   return `${dd}/${mm}/${yyyy}`
}

export function displayToIso(display: string): string | undefined {
   // display = "DD/MM/AAAA" (com ou sem as barras — a máscara já insere)
   const clean = display.replace(/\D/g, "") // só números
   if (clean.length !== 8) return undefined
   const dd = clean.slice(0, 2)
   const mm = clean.slice(2, 4)
   const yyyy = clean.slice(4, 8)
   const date = new Date(`${yyyy}-${mm}-${dd}`)
   if (isNaN(date.getTime())) return undefined
   return date.toISOString()
}
