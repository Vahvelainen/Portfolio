# Portfolio
Hello and welcome!

This is source for Leevi's personal portfolio page.
If you are wondering how to build your own portfolio or other webpage, don't look here :)

The repository was originally based on single page node express app following this tutorial on youtube:
https://youtu.be/6BozpmSjk-Y

Furthermore, stack has grown with
- separate html files with few render functions
- sass for styling
- npm-run-all for mostly running sass along server when developing 

Goot to knows:
- Only stuff from 'frontend/static/' can be accessed, everything else routes to '/'
- All the rendering happens still at index.js (at the time of writing)
- css is compiled from scss, dont go there

Commands to remember
- 'node . / node server.js' to run the app
- 'nmp i' to install dependencies
- 'npm run scss:build' to build css
- 'npm run dev' to run server AND watch scss updates (you know, for developing)

Server is running on:
- Ubuntu 20.4.
- Nginx
- PM2 (runnign as index 1 "server")
- On digitalocean

Render functions:
- <elem include-html='url.html'></elem> will include html from address to the element
- <elem load-article='url.JSON'></elem> will read JSON and put certain data into the element in certain manner
- <elem class='square'></elem> will keep the element height same as width because css just isnt there yet

Updated 4.1.2022
