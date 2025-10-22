export default function Button({ children, onClick, className = '' }) {
  const estilo_original = "ml-2 px-4 py-2 rounded transition";
  const estilo_pordefecto = "bg-black text-white hover:bg-red-600";

  // 3. Si se pasa un className, se usa ese. Si no, se usan los por defecto.
  const estilo_sobreescrito = className ? className : estilo_pordefecto;

  return (
    <button
      onClick={onClick}
      // 4. Se combinan los estilos base con los finales.
      className={`${estilo_original} ${estilo_sobreescrito}`}
    >
      {children}
    </button>
  );
}