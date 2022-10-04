# Design Decisions

## Why cards in a grid?

I at first was thinking of doing a standard table but I always hated
how tables behaved on mobile - requiring the user to scroll horizontally
in order to see all the info within the table.

A grid layout with cards to present the data made more sense when thinking
from a mobile-first perspective. Not to mention that on a wider screen/monitor,
more candidates could be displayed compared to a table.

Of course, the tradeoff here is that if there ever needs to be more data
added to the card, the card will get larget. Not to mention that if there
is ever a need to add more "power user" features to this app, it might be
a bit more difficult (but still doable in my opinion).

In the end, I felt that the benefits outweighed any tradeoffs there might be.

## Why Radix UI components?

I try to support as much accessibility as I can in any application that I build.
Since building out proper and meaningful accessibility for certain components
can be tough to achieve in a short span of time, I decided to defer that to
the team who created Radix UI (which is a library with a lot of community support).
