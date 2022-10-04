# Wishlist

## Virtualized list for candidate cards

I should have done this from the beginning and it would have resulted in better
performance on slower devices, especially when rendering so many cards (without pagination).

But to be honest, virtualization is something I usually relied on third-party libraries for,
and so I didn't want to waste too much time trying to reinvent it (since I wasn't sure if
this was part of the constraints of the challenge).

## Adding a spinner instead of static loading text

I didn't have time to create a custom spinner component so it was put very low
on my priority list. However, if this app went to production, a spinner for the
loading indicator is just best practice at this point (especially since the API takes
a long time to load).

## Better SCSS code

My SCSS code is wetter than I would have liked it to be. If I had more time, I would move
some things into custom mixins and some reused values into their own variables.

## More unit and integration tests

I ran out of time (due to a personal emergency) and couldn't write more tests. I would love
to write some tests for the sort and filter utility functions since they are quite heavy.
Also, integration tests for the UI sort and filter behaviors.

## Style the ErrorBoundary component and make it more useful

The ErrorBoundary component as it is is very ugly and not super informative to the user.
This is something I would have loved to fix had I had more time.

## Squash some more bugs

There are two bugs that I wish I had more time to investigate:

1. Initial page loading causes a transition flash where it shows "No candidates found".
   This would have required me to dig deeper into the code to see why the `candidateList`
   was being rendered empty during page load. I wish I had more time to do so.
2. Manually changing the search params for the `sortKey` causes the 'None' item in the sort select field to vanish
