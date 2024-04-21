import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Flag, Heart, Plus, Share2, Shuffle } from "lucide-react";
import Link from "next/link";

const factoids = [
  {
    id: 1, description: 'There are 37 holes in the mouthpiece of a telephone.', note: `I'm talking about "old" style phones with the "Mickey Mouse" handsets that have the round mouthpieces with roughly the following pattern of holes.`
  },
  { id: 2, description: 'There are 37 bars in the digits of a digital watch.', note: `It has to be a 12-hour-mode display, and you have to count the seconds:` },
  { id: 3, description: 'All American Express card numbers begin with 37.', note: "" },
  {
    id: 4, description: 'In a "3-4-5" right triangle, the small angle is approximately 37 degrees.', note: `And so the sine, cosine, and tangent of 37 degrees are approximately 3/5, 4/5, and 3/4, respectively. This in turn means you can do easy calculations with these trigonometric values without needing a calculator.

  Because of all this, 37 degrees is a popular angle for use in physics tests.` },
  { id: 5, description: 'The Green Monster in Fenway Park is 37 feet tall.' },
  { id: 6, description: 'There were 37 extramarital affairs on "Dallas" during the 1980s.' },
  {
    id: 7, description: `The answer to the "Sultan's Dowry" puzzle is to wait until you have seen 37 daughters, then choose the next one with a dowry bigger than any so far. Your odds of winning with this strategy are about 37%.`, note: `The "Sultan's Dowry" problem
  A sultan has granted a commoner a chance to marry one of his hundred daughters. The commoner will be presented the daughters one at a time. When a daughter is presented, the commoner will be told the daughter's dowry. The commoner has only one chance to accept or reject each daughter; he cannot return to a previously rejected daughter. The sultan's catch is that the commoner may only marry if he chooses the daughter with the highest dowry. What is the commoner's best strategy assuming that he knows nothing about the distribution of dowries?
  The answer
  The answer (without all of the probabilistic math) is that the commoner should wait until he has seen 37 of the daughters, and then choose the first one with a dowry bigger than any so far. With this strategy, the odds of choosing the daughter with the highest dowry are about 37%.` },
  {
    id: 8, description: 'There are 37 miracles in the Bible.', note: `I don't know what is going on here. Many people have told me this is impossible. They always say things like "there have to be a lot more than that", or start musing on what sorts of contrivances might have been applied to the set of miracles that "count" to arrive at 37.

  All I know is I have a little scrap of paper, about 15 years old, which says in my handwriting "37 miracles in the Bible". My assumption (though I don't remember) is that someone told me the factoid, and I scribbled it down so I wouldn't forget.
  
  Any light that an alert reader could shed on this stressful situation would be appreciated.` },
  { id: 9, description: 'In the Bible, Psalm 37 is one of the few that are acrostic.', note: `The first letter of every other verse is a consecutive letter of the Hebrew alphabet.` },
  { id: 10, description: 'The University of Illinois Conservatory is 37 feet high at its apex.', note: `` }
];

const websiteIntro = {
  title: '37 Heaven',
  description: 'A crowdsourced collection for the number 37 enthusiasts.'
};

export default function Home() {
  return (
    <MaxWidthWrapper className="mb-12 mt-8 flex items-start justify-center">
      <div className="flex flex-col w-2/3 space-y-4">
        {factoids.map((factoid, index) => (
          <div key={factoid.id} className="bg-white shadow-sm rounded-lg px-6 py-8 border border-zinc-100">
            {index === 0 && (
              <div className="bg-zinc-900 text-white rounded-lg px-2 py-1 text-xs text-center font-bold max-w-32 mb-2">
                factoid of the day
              </div>
            )}
            <p className="font-semibold text-xl">{factoid.description}</p>
            <p className="mt-6">{factoid.note}</p>
            <div className="flex items-center space-x-2 text-xs mt-8">
              <span className="font-semibold">- Tom Magliery</span>
              <span>•</span>
              <span>24 years ago</span>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div
                className="cursor-pointer flex items-center justify-center gap-1">
                <Heart className='h-5 w-5 hover:text-red-500' />
                <p>1</p>
              </div>

              <div className="flex items-center justify-center gap-5">
                <div
                  className="cursor-pointer flex items-center justify-center gap-1 text-zinc-600 hover:opacity-75">
                  <Share2 className='h-5 w-5' />
                  <p>Share</p>
                </div>

                <div
                  className="cursor-pointer flex items-center justify-center gap-1 text-red-500 hover:opacity-75">
                  <Flag className='h-5 w-5' />
                  <p>Report</p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className="w-1/3 ml-4 sticky top-16 space-y-4">
        <div className="bg-white shadow-sm rounded-lg p-4 border border-zinc-100">
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-semibold">{websiteIntro.title}</h3>
            <p className="text-sm text-zinc-700">{websiteIntro.description}</p>
          </div>

          <div className="flex flex-col items-center py-6">
            <p className="font-semibold text-zinc-500">COLLECTIONS</p>
            <p className="font-semibold text-3xl">47,384</p>
          </div>

          <div className="space-y-2">
            <Link href='/submit' className={cn(buttonVariants({
              size: "sm", variant: "ghost"
            }), "flex items-center justify-center gap-2 px-4 border border-zinc-200")}>
              <Plus className='h-4 w-4' />
              <span>Submit a 37 factoid</span>
            </Link>

            <div
              className={cn(buttonVariants({
                variant: "ghost",
                size: "sm",
              }), "cursor-pointer flex items-center justify-center gap-2 px-4 border border-zinc-200")}>
              <Shuffle className='h-4 w-4' />
              <span>I&apos;m feeling lucky</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-4 border border-zinc-100">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Browse categories</p>
            <ChevronDown className='h-4 w-4' />
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {["Amazing", "Historical", "Ephemeral", "Random", "Sports", "Scientific", "Personal", "Numerical", "Movies", "Comics", "Media", "Pictures", "Sounds", "Links", "Multiples", "37th things"].map((category, index) => (
              <div key={index} className='my-1 cursor-pointer max-w-32 rounded-lg bg-gray-200 px-2 py-1 hover:opacity-75'>
                <p className="text-xs text-center font-semibold text-zinc-700">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
