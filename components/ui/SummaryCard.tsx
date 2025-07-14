import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function SummaryCard({ summary, language }: { summary: string; language: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-10 max-w-3xl mx-auto"
    >
      <Card className="bg-white border-[6px] border-yellow-300 rounded-[40px] shadow-2xl p-6 backdrop-blur-md relative">
        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-yellow-700 flex items-center justify-center gap-2">
              🍽️ Dish is Served!
            </h2>
            <p className="text-gray-700 text-lg mt-2">Here is the freshly cooked summary:</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl shadow-inner">
            <p className="text-gray-800 font-medium leading-relaxed whitespace-pre-wrap">
              {summary}
            </p>
          </div>

          <div className="text-right">
            <h2 className="text-xl font-semibold text-green-800">👨‍🍳 Served With:</h2>
            <p className="text-green-700 italic font-serif mt-1 whitespace-pre-wrap">
              {language}
            </p>
          </div>
        </CardContent>

        {/* Decorative plate ring */}
        <div className="absolute -top-2 -bottom-2 -left-2 -right-2 border-[10px] border-dashed border-yellow-300 rounded-[48px] pointer-events-none z-[-1]" />
      </Card>
    </motion.div>
  );
}
