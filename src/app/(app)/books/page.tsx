"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Book = {
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  downloadLink: string;
  dataAiHint: string;
};

const books: Book[] = [
  {
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    description: "What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not!",
    imageUrl: "https://i.postimg.cc/bNQpqLPt/rich-dad-poor-dad.jpg",
    downloadLink: "https://drive.google.com/file/d/1OfBSxt08aWEKKmcCTpZDwXxGhmlHT-j_/view?usp=drive_link",
    dataAiHint: "book cover finance"
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    description: "The landmark bestseller that has inspired millions to achieve their dreams.",
    imageUrl: "https://i.postimg.cc/431YnsT7/Think-and-grow-rich.jpg",
    downloadLink: "https://drive.google.com/file/d/1g3_GBUsVqI2cgypjCKT9ErlF5Lan1dFw/view?usp=drive_link",
    dataAiHint: "book cover success"
  },
  {
    title: "How to Talk to Anyone",
    author: "Leil Lowndes",
    description: "92 Little Tricks for Big Success in Relationships.",
    imageUrl: "https://i.postimg.cc/D07k03nr/how-to-talk-to-anyone.jpg",
    downloadLink: "https://drive.google.com/file/d/1SaDtkzQoKEcHd1lwKEkZ8GN_sWA2Fl7B/view?usp=drive_link",
    dataAiHint: "book cover communication"
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    description: "Notes on Startups, or How to Build the Future.",
    imageUrl: "https://i.postimg.cc/v8hChjG1/zero-to-one.jpg",
    downloadLink: "https://drive.google.com/file/d/1rfmKgPZJMpHupmKyAlQjX22NynQaSfSn/view?usp=drive_link",
    dataAiHint: "book cover business"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones.",
    imageUrl: "https://i.postimg.cc/zfwxBbBv/atomic-habits-book.jpg",
    downloadLink: "https://drive.google.com/file/d/1Xl_tUIA92Whuzwcm1Io9zV3uAO3cKmk7/view?usp=drive_link",
    dataAiHint: "book cover self help"
  },
  {
    title: "The Secret",
    author: "Rhonda Byrne",
    description: "A self-help book about the power of positive thinking and the law of attraction.",
    imageUrl: "https://i.postimg.cc/PxrQ5S0r/the-secret.jpg",
    downloadLink: "https://drive.google.com/file/d/1Im9NbEJlt8cN5TW2L5leBcaAkjkw-mK3/view?usp=drive_link",
    dataAiHint: "book cover spirituality"
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    description: "Timeless lessons on wealth, greed, and happiness.",
    imageUrl: "https://i.postimg.cc/rsRWD3Jh/psychology-of-money.jpg",
    downloadLink: "https://drive.google.com/file/d/1ZHQ-b9BRfUa2ASbXKCa_j7lhOTJK7a5X/view?usp=drive_link",
    dataAiHint: "book cover finance"
  },
  {
    title: "The Laws of Human Nature",
    author: "Robert Greene",
    description: "A deep dive into the forces that drive human behavior.",
    imageUrl: "https://i.postimg.cc/YCNbbLH2/laws-of-human-nature.webp",
    downloadLink: "https://drive.google.com/file/d/1kEcNrr9pbb2gUeaXpXcb9Ppjn0Okckv7/view?usp=drive_link",
    dataAiHint: "book cover psychology"
  },
  {
    title: "Do Epic Shit",
    author: "Ankur Warikoo",
    description: "A book on entrepreneurship, life, and success.",
    imageUrl: "https://i.postimg.cc/zGk43cVJ/do-epic-shit.jpg",
    downloadLink: "https://drive.google.com/file/d/1xD0dVvLpigO7uP6eLbT8wPLRGWNdO3Ct/view?usp=drive_link",
    dataAiHint: "book cover motivation"
  },
  {
    title: "Ikigai",
    author: "Héctor García and Francesc Miralles",
    description: "The Japanese Secret to a Long and Happy Life.",
    imageUrl: "https://i.postimg.cc/BvVYK9s9/ikegai.jpg",
    downloadLink: "https://drive.google.com/file/d/1Nc5_c5F_EOsuFkV7J-eGMSouHhVrIhY0/view?usp=drive_link",
    dataAiHint: "book cover purpose"
  },
  {
    title: "12 Rules for Life",
    author: "Jordan B. Peterson",
    description: "An Antidote to Chaos.",
    imageUrl: "https://i.postimg.cc/ydRP3DvK/12-rules-for-life.jpg",
    downloadLink: "https://drive.google.com/file/d/1-2BmN3sMUOlSB1DBW2vsi51HXHq7grvl/view?usp=drive_link",
    dataAiHint: "book cover psychology"
  },
  {
    title: "500+ Books Bundle",
    author: "Various Authors",
    description: "A massive collection of 500 books across various genres and topics, all in one bundle.",
    imageUrl: "https://i.postimg.cc/pXM2F3X5/Gemini-Generated-Image-9m3rp9m3rp9m3rp9.png",
    downloadLink: "https://drive.google.com/file/d/1JmNwJle7TJXOX_mF6jW5VMySgGHg49uB/view?usp=drive_link",
    dataAiHint: "book bundle collection"
  }
];

export default function BooksPage() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center gap-3">
          <Book className="h-10 w-10 text-accent" />
          E-Book Library
        </h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-3xl mx-auto">
          Explore our curated library of e-books. Click download to get your copy.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {books.map((book) => (
            <Card key={book.title} className="flex flex-col bg-card/80 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
              <CardHeader className="p-0">
                  <Image 
                    src={book.imageUrl} 
                    alt={`${book.title} book cover`}
                    width={400}
                    height={600}
                    className="rounded-t-lg aspect-[2/3] object-cover"
                    data-ai-hint={book.dataAiHint}
                  />
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <CardTitle className="font-semibold text-lg text-foreground">{book.title}</CardTitle>
                <CardDescription className="text-sm">by {book.author}</CardDescription>
                <p className="text-xs text-muted-foreground mt-2">{book.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                 <Button asChild className="w-full font-semibold">
                    <Link href={book.downloadLink} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Link>
                 </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
