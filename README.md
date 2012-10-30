## Ideas

* Grid of dots
* players start in corners
* when passing through a dot, player "owns" it, and gains points
* dots give powerups - fork, branch
  - fork   - head splits in two, going left and right
  - branch - head continues, another head branches of the side
* control is relative:
  - <kbd>&larrow;</kbd> - turn counterclockwise
  - <kbd>&rarrow;</kbd> - turn clockwise
  - All heads move simultaneously
* head hits graph - all dots before it become shared (merge)
* cyclic merge - ???
* diagonal hit - cross-over
* hit the wall - head progress stops
* head-on-head collision
  - 90/45 degree - merge into AI player
  - otherwise, kill both heads and destroy dot
* no heads left - game over
