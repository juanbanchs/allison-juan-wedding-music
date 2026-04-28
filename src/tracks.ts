export type Track = {
  id: string
  number: string
  title: string
  movement?: string
  audioFile: string
  photo: string
  lyrics?: string
}

const base = import.meta.env.BASE_URL

export const tracks: Track[] = [
  {
    id: 'two-become-juan',
    number: 'I',
    title: 'Two Become Juan',
    audioFile: `${base}audio/track9-v4-two-become-juan.mp3`,
    photo: `${base}photos/IMG_1969.jpg`,
    lyrics: `Little boy from Venezuela
Rolling arepas in his hands
Papá found a job across the ocean
Said "mijo, we got bigger plans"
Flew him to the land of tapas
Barcelona sun and stone
Then the mer-lion called him over
Chilli crab in Singapore
One more flight to California
Didn't know what was in store

Somewhere out in Chicago
A girl was growing up
Chinese roots and Midwest winters
Dumplings folded, baos stuffed
She was twirling through ballet
And building robots after school
Little did she know a boy had just
Touched down in the Golden State

Two become Huan
We won't look back
We're moving on as one
Two become Huan
Two halves who finally found a home
From across the world we wandered
Somehow ended side by side
Two become Huan
And that's the sweetest part of life

Orientation, day one
September, neither had a clue
Strangers turned to friends so quickly
Growing closer as time flew
Physics lab, we ran the numbers
Best team spreadsheets ever knew
Hours deep in calculations
Still I'd rather crunch with you
Then Bruin Racing came along
We led the structures crew
Built a thermoforming rig
With steady hands and tightening screws
Late nights in Creative Labs on Flow
Our little Io tea dream
Stayed up past 3 a.m. to fix it right
Before COVID came in between

Two become Huan
We won't look back
We're moving on as one
Two become Huan
Two halves who finally found a home
From across the world we wandered
Somehow ended side by side
Two become Huan
And that's the sweetest part of life

COVID shut the campus down
The world went off the rails
But when the dust had finally settled
We picked up where stories trail
Seven hours, just us walking
Talking 'til our feet were sore
Somewhere on that endless sidewalk
I was sure I wanted more
Then she took my hand for bachata
Steps and heartbeats keeping time
Senior year we made it official
I was yours and you were mine
Arepa dinners and avocado breakfasts
Kombucha brewing on the shelf
She'd be whipping up her hummus
We were building something else

Two become Huan
We won't look back
We're moving on as one
Two become Huan
Two halves who finally found a home
From across the world we wandered
Somehow ended side by side
Two become Huan
And that's the sweetest part of life

Graduation came and "pajama"
Packed their bags for Iceland
The waterfalls were roaring
And the volcanoes almost erupting
Then our trip to Norway's fjords
A little ferry, cruising between the mountains
That's where I first said I love you
And she smiled and whispered the same
Then in Sweden, in a park beneath
The tender afternoon sun
Six whole months after we started to date
One kiss, patient, one kiss perfect
Worth every single bit of wait
On to Italy and Vatican halls
Then Spain for one last tapas night
Sometimes slow is how it's written
Sometimes love just takes its time

Now he's out in Glen Cove, Long Island
Building robotic arms with style
She's at Princeton chasing a PhD
But it's only for a while
Every mile between us matters
Every visit worth the ride
We keep showing up for each other
That's how love stays alive
She brought spikeball to the campus
Got the whole of Princeton hooked
And our engagement photos?
Fuzhou, China, go ahead and look
Two families, two languages
Two worlds that overlap
Tekehños next to dumplings
On the same Thanksgiving plaque

Two become Huan
And we can't wait to be as one
Two become Huan
Two halves who finally found a home
Venezuela, China, Barcelona
Chicago, and the rest
Every city was a chapter
Getting us to what comes next
To Boston we go
And God plans the rest
Two become Huan
One flesh, one promise, one new name
Two become Huan
And nothing's ever been the same`,
  },
  {
    id: 'wedding-march',
    number: 'II',
    title: 'Wedding March',
    movement: 'Processional',
    audioFile: `${base}audio/track1-v1-wedding-march.mp3`,
    photo: `${base}photos/9b235461-8be4-4c87-bf8e-973941044d4c.jpg`,
  },
  {
    id: 'allegro-i',
    number: 'III',
    title: 'Nuptial Concert',
    movement: 'Allegro I',
    audioFile: `${base}audio/track2-nuptial-concert-allegro-i.mp3`,
    photo: `${base}photos/IMG_8797.jpg`,
  },
  {
    id: 'adagio',
    number: 'IV',
    title: 'Nuptial Concert',
    movement: 'Adagio',
    audioFile: `${base}audio/track3-nuptial-concert-adagio.mp3`,
    photo: `${base}photos/DSC01165_Original.jpeg`,
  },
  {
    id: 'allegro-ii',
    number: 'V',
    title: 'Nuptial Concert',
    movement: 'Allegro II',
    audioFile: `${base}audio/track4-nuptial-concert-allegro-ii.mp3`,
    photo: `${base}photos/DSC01338-3.jpg`,
  },
  {
    id: 'song-of-songs',
    number: 'VI',
    title: 'Song of Songs 8:6–7',
    audioFile: `${base}audio/track5-v2-song-of-songs-8-6-7.mp3`,
    photo: `${base}photos/IMG_3417.JPG`,
    lyrics: `Place me like a seal over your heart,
like a seal on your arm;
for love is as strong as death,
its jealousy unyielding as the grave.

It burns like blazing fire,
like a mighty flame.
Many waters cannot quench love;
rivers cannot sweep it away.

If one were to give all the wealth
of one's house for love,
it would be utterly scorned.`,
  },
  {
    id: 'psalm-103',
    number: 'VII',
    title: 'Psalm 103',
    movement: '8–12',
    audioFile: `${base}audio/track6-v2-psalm-103-8-12.mp3`,
    photo: `${base}photos/IMG_7038.jpg`,
    lyrics: `The Lord is compassionate and gracious,
slow to anger, abounding in love.

He will not always accuse,
nor will he harbor his anger forever;
he does not treat us as our sins deserve
or repay us according to our iniquities.

The Lord is compassionate and gracious,
slow to anger, abounding in love.

For as high as the heavens are above the earth,
so great is his love for those who fear him;
as far as the east is from the west,
so far has he removed our transgressions from us.

The Lord is compassionate and gracious,
slow to anger, abounding in love.`,
  },
  {
    id: 'water-into-wine',
    number: 'VIII',
    title: 'Water Into Wine',
    audioFile: `${base}audio/track7-v2-water-into-wine.mp3`,
    photo: `${base}photos/8cee948f25baf9baac6dcf5b43e8b2fa.jpg`,
    lyrics: `In Cana long time ago
Dear Lord Jesus Christ
Your first miracle we know
Gracious present unpriced

You transformed water into wine
What a miracle divine
Later wine became your blood
Gift of your merciful love

No occasion had been best
Than a wedding celebration
As per your mother request
To start your plan of salvation

You transformed water into wine
What a miracle divine
Later wine became your blood
Gift of your merciful love

Transform again oh Lord,
Our water into wine
Our wine into your blood

You transformed water into wine
What a miracle divine
Later wine became your blood
Gift of your merciful love

Water into wine
A miracle divine
Water into wine
A miracle divine
Water into wine`,
  },
  {
    id: 'when-east-meets-west',
    number: 'IX',
    title: 'When East Meets West',
    audioFile: `${base}audio/track8-v2-when-east-meets-west.mp3`,
    photo: `${base}photos/1213bc0394711a0883898a716df8d7e1.jpg`,
    lyrics: `California skies,
where it all began
Golden light falling on
her hand in his hand
Between the waves
and the redwood trees
They built a world
no map could see

Funny how the lines we draw
Fade when hearts collide
Every road that led them far
Brought them side by side

When east meets west,
the world stands still
Not where you're from,
but how you feel
Two distant stars
in the same sunset
Writing a story
they won't forget
From coast to coast,
from past to now
They found their way,
they don't know how
In every step,
in every breath
It's love… when east meets west

She carried roots
from stories told
In whispered dreams
and streets of gold
He brought a rhythm,
warm and free
A fusion of who
they're meant to be

Every border, every name
Started to dissolve
In the language of their hearts
No need to resolve

When east meets west,
the world stands still
Not where you're from,
but how you feel
Two distant stars
in the same sunset
Writing a story
they won't forget

Now they're dancing
where the cold winds blow
Boston lights
in the winter glow
East coast dreams with
a west coast start
Two worlds, one home,
one beating heart

What is east and what is west?
Just directions at their best
When love rewrites the lines we knew
Every road leads me to you

When east meets west,
it all makes sense
Through every mile,
through every fence
A thousand miles
just disappear
When you're standing
just right here
From where they were
to where they'll be
They found their truth
across the sea
No matter where
their compass rests
It's love… when east meets west

Not east, not west,
just you and me
Right where we're
always meant to be`,
  },
]

export const heroPhoto = `${base}photos/0V8A0727.JPG`
