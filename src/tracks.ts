export type Track = {
  id: string
  number: string
  title: string
  movement?: string
  audioFile: string
  photo: string
  lyrics?: string
  bonus?: boolean
}

const base = import.meta.env.BASE_URL

export const tracks: Track[] = [
  {
    id: 'two-become-juan',
    number: 'I',
    title: 'Two Become Juan',
    audioFile: `${base}audio/track9-v4-two-become-juan.mp3`,
    photo: `${base}photos/IMG_1969.jpg`,
    lyrics: `Little boy from Venezuela, rolling arepas in his hands
Papá found a job across the ocean, said "mijo, we got bigger plans"
Flew him to the land of tapas, Barcelona, sun galore
Then the merlion called him over — chilli crab in Singapore

One more flight to California, didn't know what was in store
Somewhere out in Chicago, a girl worth waiting for
Chinese roots and Midwest winters, dumplings folded, baos stuffed
Ballet shoes and robotics club — girl was more than good enough
Little did she know a boy had just touched down in the Golden State

Two become Juan — we won't look back, we're moving on as one
Two become Juan — two halves who finally found a home
From across the world we wandered, somehow ended side by side
Two become Juan — and that's the sweetest part of life

Orientation, day one, September, neither had a clue
Strangers turned to friends so quickly, growing closer as time flew
Physics lab, we ran the numbers, best team spreadsheets ever knew
Hours deep in calculations, still I'd rather crunch with you

Then Bruin Racing came along, we led the structures crew
Built a thermoforming rig with steady hands and tightening screws
Late nights in Creative Labs on Flow — sensors, prints, and one big dream
Stayed up past 3 a.m. to fix it right before COVID came in between

Two become Juan — we won't look back, we're moving on as one
Two become Juan — two halves who finally found a home
From across the world we wandered, somehow ended side by side
Two become Juan — and that's the sweetest part of life

COVID shut the campus down, the world went off the rails
But when the dust had finally settled, we picked up where stories trail
Seven hours, just us walking, talking 'til our feet were sore
Somewhere on that endless sidewalk, I was sure I wanted more

Then she took my hand for bachata, steps and heartbeats keeping time
Senior year we made it official — I was yours and you were mine
Arepa dinners and avocado breakfasts, kombucha brewing on the shelf
She'd be whipping up her hummus, we were building something else

Two become Juan — we won't look back, we're moving on as one
Two become Juan — two halves who finally found a home
From across the world we wandered, somehow ended side by side
Two become Juan — and that's the sweetest part of life

Graduation came and "pajama" flew to Iceland — wild and free
Waterfalls were roaring, volcanoes rumbling — what a sight to see
Then to Norway's fjords — a ferry ride that changed the game
That's where he first said I love you, and she whispered the same

Then in Sweden, in a park beneath the tender afternoon sun
Six whole months into our story — our first kiss had finally come
One kiss, patient, one kiss perfect — worth every bit of wait
On to Italy and Vatican halls, then Spain for one last tapas date
Sometimes slow is how it's written, sometimes love just takes its time

Now he's out in Glen Cove, Long Island, building robotic arms with style
She's at Princeton chasing a PhD, but it's only for a while
Every mile between us matters, every visit worth the ride
We keep showing up for each other — that's how love stays alive

She brought spikeball to the campus, got the whole of Princeton hooked
And our engagement photos? Fuzhou, China — go ahead and look
Two families, two languages, two worlds on the same track
Tequeños next to dumplings on the same Thanksgiving plaque

Two become Juan — and we can't wait to be as one
Two become Juan — this story's only just begun
Venezuela, China, Barcelona, Chicago, and the rest
Every city was a chapter getting us to what comes next
To Boston we go, and God plans the rest

Two become Juan — one flesh, one promise, one new name
Two become Juan — and nothing's ever been the same`,
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
    title: 'Song of Songs',
    movement: '8:6–7',
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
    title: 'Psalms',
    movement: '103:8–12',
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
  {
    id: 'vengo-del-futuro',
    number: 'X',
    title: 'Vengo del Futuro',
    movement: 'Chinese version',
    bonus: true,
    audioFile: `${base}audio/track10-v1-vengo-del-futuro.mp3`,
    photo: `${base}photos/IMG_5927.jpg`,
    lyrics: `Vengo del futuro
Para decirte que estamos juntos
Y que lo nuestro ha valido cada esfuerzo
Y que te sigues viendo espectacular

La más pequeña
Tiene ese brillo que tienen tus ojos
Y ahora está por empezar a caminar
Y su sonrisa se apodera de mi vida

Soy el hombre más feliz
Desde que te conocí, amor
Y hacerme viejo junto a ti
Será toda una bendición

Y que aún seguimos de la mano
Como dos enamorados
Caminando hacia el café
Donde un día te besé
Que soy el más afortunado
Por tenerte aquí a mi lado
Créeme
Que aunque pasen muchos años te amaré

Vengo del futuro
Para pedirte que no tengas miedo
Y que confíes que lo nuestro será eterno
Y que yo soy el que tus pasos va a cuidar
(Oh-uh-oh-ouh-uoh)

Soy el hombre más feliz
Desde que te conocí, amor
(De saber que estas aquí, ah)
Y hacerme viejo junto a ti
Será toda una bendición (Uh-oh-oh-oh-oh)

Y que aún seguimos de la mano (Mano)
Como dos enamorados (-rados)
Caminando hacia el café
Donde un día te besé
Que soy el más afortunado
Por tenerte aquí a mi lado
Créeme
Que aunque pasen muchos años, te amaré

Uh-ah-ah
Uh-oh-oh-oh-oh, uh-ah-ah (Uoh-oh-oh)
Oh-oh-oh, uh-uh-uh-uh-uh-uh (Uoh-oh-oh, uoh-oh-oh)
Uy, uy (Uoh-oh-oh)
(Uoh-oh-oh)

Y que aún seguimos de la mano
Como dos enamorados
Caminando hacia el café
Donde un día te besé
Que soy el más afortunado
Por tenerte aquí a mi lado
Créeme
Que aunque pasen muchos años
Te amaré`,
  },
]

export const heroPhoto = `${base}photos/0V8A0727.JPG`
