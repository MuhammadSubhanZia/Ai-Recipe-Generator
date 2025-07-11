import { Card, CardContent } from "@/components/ui/card";

export default function SummaryCard({ summary, urdu }: { summary: string; urdu: string }) {
  return (
    <Card className="mt-10 max-w-3xl mx-auto bg-white/80 backdrop-blur-sm border border-gray-300 shadow-xl">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">AI-Generated Summary</h2>
        <p className="text-gray-700">{summary}</p>
        <hr />
        <h2 className="text-xl font-bold text-gray-800 text-right">اردو ترجمہ</h2>
        <p className="text-right font-serif text-lg text-gray-800">{urdu}</p>
      </CardContent>
    </Card>
  );
}
