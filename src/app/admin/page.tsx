// En tu página principal
import SectionForm from '../components/SectionForm';
import SectionTree from '../components/SectionTree';
export default function AdminPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Administrar Secciones</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-black">
        <SectionForm />
        <SectionTree />
      </div>
    </div>
  );
}