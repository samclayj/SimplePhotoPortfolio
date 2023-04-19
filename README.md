# SimplePhotoPortfolio

[Netlify](https://app.netlify.com/sites/inquisitive-zabaione-447fd7/overview) 

[Github](https://github.com/samclayj/SimplePhotoPortfolio/tree/main) 

[Netlify large Media Support](https://app.netlify.com/sites/inquisitive-zabaione-447fd7/large-media) 

[https://app.netlify.com/sites/inquisitive-zabaione-447fd7/overview](https://app.netlify.com/sites/inquisitive-zabaione-447fd7/overview) 

**Netlify for Photo Portfolio**

* This combined with the Netlify CDN, and Fastmail for email should totally satisfy my entire photo portfolio use-case, for way less than the Squarespace cost (~$20/month). Plus, it’s more customizable and low maintenance with the “deploy on git push” options.


## Portfolio README

Prereqs/Configuration:

- [Install Node](https://nodejs.org/en/download/) - need to `chmod` the directories to your user to avoid `eaccess` issues.
- Install [Git Large File Storage](https://git-lfs.github.com).
- Install and configure [Netlify CLI](https://docs.netlify.com/cli/get-started/#authentication).
- [Netlify Configure Large Media](https://docs.netlify.com/large-media/setup/)
- Link Git project to Netlify
- Run large media setup

## Adding Images

Drop a folder of images into the `/static/` directory, then track these with git ifs:

```
git lfs track "/static/fear_of_water/**"
```

Then commit and push to origin. The files in the repo will just be text files, and the images themselves are stored in Netlify's CDN.

## Using Images

- [Example Portfolio](https://github.com/netlify/netlify-photo-gallery)
- [Transforming Images](https://docs.netlify.com/large-media/transform-images/)



