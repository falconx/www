---
title: "Luke Burroughs"
subtitle: "Designer portfolio"
thumbnail: "./thumbnail.jpg"
tags: ["website"]
---

## The brief
To create a highly visual site on all devices — rethinking the stacked nature of mobile content — to find a means of seamlessly integrating web, tablet and mobile experiences.

![](./1.png)

<div class="row">
  <div class="col-xs-12 col-md-6">

![](./2.png)

  </div>
  <div class="col-xs-12 col-md-6 first-xs last-md">

### Technology
Initially starting as Jekyll development, the site was rewritten as a SPA (Single Page Application) in Google's AngularJS framework. Mostly, two factors lead to the decision to migrate platform; firstly, well, it's just newer so why not?

More importantly though, being completely JavaScript driven meant we could avoid Ruby complexities such as the Ruby asset pipeline for production optimisations.

  </div>
</div>

&ldquo;We need to make mobile a core part of the end product — not an add-on feature. 
Already having a knowledge of JavaScript, said optimisations, including script uglification, minification, contatination and image compressing have been set up as Gulp tasks.&rdquo;

<div class="row">
  <div class="col-xs-12 col-md-6">

### Deployment

Drone.io is a CI (Continuous Integration) platform which listens for pushes against a Git branch before, in our case, deploying them to a DigitalOcean droplet endpoint. This automation makes adding or modifying content simple — upload a few project images, update a configuration file to reference them, write descriptions etc, commit the changes and Drone.io will take care of the rest!

Through the power of Node and Express, the optimised production files are served using Forever and an Upstart script ensuring that the site continues to serve even after disruptions or reboots on the host environment.

Throughout the build, much consideration was taken to ensure that the mobile experience felt a core part of the end-product and not an add-on. This meant taking time to experiment with web fonts, scalable backgrounds and vectored glyphs as icons to ensure a crisper look on high resolution screens and an equal experience across all platforms.

  </div>
  <div class="col-xs-12 col-md-6">

![](./3.png)

  </div>
</div>