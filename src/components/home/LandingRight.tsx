import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RightSection() {
    return (
        <div className="flex flex-col space-y-4">
            {["Labs", "Courses", "Assessments"].map((item) => (
                <Card
                    key={item}
                    className="relative bg-cover bg-center rounded-xl text-black dark:text-white h-48 dark:bg-black"
                >
                    <div className="absolute inset-0 bg-black/40 dark:bg-white/20 p-4 flex flex-col justify-between">
                        <h2 className="text-xl font-bold">Telco {item}</h2>
                        <Button className="self-end bg-black text-white dark:bg-white dark:text-black">
                            Explore
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
}
