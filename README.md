# Memory UI 

A frontend for [Memories][1].

You can take a look at [my brain][2] to see a possible result.

This solution shows only static data.

## requirements

For the build process the following is needed (at the time of writing)

* NodeJS: ~> 14.8.0
* Angular CLI ~> 11.03
* brain ~> 0.1.0

## get memories into your brain

You have to set up a folder for [your memories][3].
After adding some memories you have to install [brain][4].
Before installing [brain][4], you have to change the [brain memory path][5].
You should see a JSON representation of your brain by calling

```
$ brain --json
```

When everything is in place you can add your memories with

```
$ make update_memories
```

A call to

```
$ make run
```

will start a web server at `http://localhost:4200`.


[1]: https://github.com/enter-haken/memories
[2]: https://mui.hake.one
[3]: https://github.com/enter-haken/memories/tree/master/memories
[4]: https://github.com/enter-haken/brain
[5]: https://github.com/enter-haken/brain/blob/master/config/config.exs 

# Contact

[hake.one](https://hake.one). Jan Frederik Hake, <jan_hake@gmx.de>. [@enter_haken](https://twitter.com/enter_haken) on Twitter. [enter-haken#7260](https://discord.com) on discord.
