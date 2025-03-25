"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { Button } from "./ui/button";
import { ArrowRight, Link } from "lucide-react";

export function ThreeDMarqueeDemo() {
    const images = [
        "https://www.oecd.org/adobe/dynamicmedia/deliver/dm-aid--81da1bba-5e45-46df-9741-33c6113a84d1/a8d820bd-en.jpg?preferwebp=true&quality=80",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbE2ds2N7c5E0CVqz23QSsu0NGUT-5UOmc_Q&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjVqS1NR632oqqvOQPU2GziuBxBSDlwv881w&s",
        "https://www.computerworld.com/wp-content/uploads/2025/03/3611479-0-80506700-1742452887-shutterstock_2497387185.jpg?quality=50&strip=all",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsYmS0cTDCLDEasqBMiz5kYi3UzvQQeYw4OA&s",
        "https://www.oecd.org/adobe/dynamicmedia/deliver/dm-aid--81da1bba-5e45-46df-9741-33c6113a84d1/a8d820bd-en.jpg?preferwebp=true&quality=80",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbE2ds2N7c5E0CVqz23QSsu0NGUT-5UOmc_Q&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjVqS1NR632oqqvOQPU2GziuBxBSDlwv881w&s",
        "https://www.computerworld.com/wp-content/uploads/2025/03/3611479-0-80506700-1742452887-shutterstock_2497387185.jpg?quality=50&strip=all",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsYmS0cTDCLDEasqBMiz5kYi3UzvQQeYw4OA&s",
        "https://www.oecd.org/adobe/dynamicmedia/deliver/dm-aid--81da1bba-5e45-46df-9741-33c6113a84d1/a8d820bd-en.jpg?preferwebp=true&quality=80",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbE2ds2N7c5E0CVqz23QSsu0NGUT-5UOmc_Q&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjVqS1NR632oqqvOQPU2GziuBxBSDlwv881w&s",
        "https://www.computerworld.com/wp-content/uploads/2025/03/3611479-0-80506700-1742452887-shutterstock_2497387185.jpg?quality=50&strip=all",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsYmS0cTDCLDEasqBMiz5kYi3UzvQQeYw4OA&s",
        "https://www.oecd.org/adobe/dynamicmedia/deliver/dm-aid--81da1bba-5e45-46df-9741-33c6113a84d1/a8d820bd-en.jpg?preferwebp=true&quality=80",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbE2ds2N7c5E0CVqz23QSsu0NGUT-5UOmc_Q&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjVqS1NR632oqqvOQPU2GziuBxBSDlwv881w&s",
        "https://www.computerworld.com/wp-content/uploads/2025/03/3611479-0-80506700-1742452887-shutterstock_2497387185.jpg?quality=50&strip=all",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsYmS0cTDCLDEasqBMiz5kYi3UzvQQeYw4OA&s",
        "https://www.oecd.org/adobe/dynamicmedia/deliver/dm-aid--81da1bba-5e45-46df-9741-33c6113a84d1/a8d820bd-en.jpg?preferwebp=true&quality=80",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbE2ds2N7c5E0CVqz23QSsu0NGUT-5UOmc_Q&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjVqS1NR632oqqvOQPU2GziuBxBSDlwv881w&s",
        "https://www.computerworld.com/wp-content/uploads/2025/03/3611479-0-80506700-1742452887-shutterstock_2497387185.jpg?quality=50&strip=all",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsYmS0cTDCLDEasqBMiz5kYi3UzvQQeYw4OA&s",
    ];
    return (
        <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full -z-10"
        images={images}
    />
    );
}
