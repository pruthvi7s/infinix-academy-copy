
interface RoadmapDisplayProps {
  roadmap: string;
}

export default function RoadmapDisplay({ roadmap }: RoadmapDisplayProps) {
  // Split the roadmap into lines for processing
  const lines = roadmap.split('\n').filter(line => line.trim() !== '');

  const elements = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="space-y-1.5 list-disc list-inside pl-2 text-foreground/90 my-2">
          {currentList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
      currentList = []; // Reset the list
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Main Heading: ## ...
    if (trimmedLine.startsWith('## ')) {
      flushList(); // Render any pending list before the new heading
      elements.push(
        <h3 key={`h3-${index}`} className="text-lg font-bold text-primary mt-4 first:mt-0">
          {trimmedLine.substring(3)}
        </h3>
      );
    }
    // Subheading: **...**
    else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
      flushList(); // Render any pending list before the new subheading
      elements.push(
        <p key={`p-${index}`} className="font-semibold text-foreground mt-3 mb-1">
          {trimmedLine.substring(2, trimmedLine.length - 2).replace(/:$/, '')}
        </p>
      );
    }
    // List Item: * ...
    else if (trimmedLine.startsWith('* ')) {
      currentList.push(trimmedLine.substring(2));
    }
    // Plain paragraph text (fallback)
    else {
        flushList();
        elements.push(
            <p key={`p-${index}`} className="text-foreground/90">{trimmedLine}</p>
        );
    }
  });

  flushList(); // Render any remaining list items at the end

  return <div className="text-sm py-2 px-1">{elements}</div>;
}
