#include <stdio.h>

int main() {
  for (int i = 0; i < 1000000; i++) {

    // one line at a time
    // printf("%d\n", i);

    // all the numbers on one line
    printf("%d\r", i);
  }
}
