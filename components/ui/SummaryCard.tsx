export default function SummaryCard({ summary, urdu }: { summary: string; urdu: string }) {
  return (
    <div className="bg-white p-6 rounded shadow-md mt-6 max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">Summary</h2>
      <p>{summary}</p>
      <h2 className="text-xl font-bold text-right">اردو ترجمہ</h2>
      <p className="text-right">{urdu}</p>
    </div>
  );
}
