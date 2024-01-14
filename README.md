# SimplePhotoPortfolio

[Netlify](https://app.netlify.com/sites/inquisitive-zabaione-447fd7/overview) 

[Github](https://github.com/samclayj/SimplePhotoPortfolio/tree/main) 

[https://app.netlify.com/sites/inquisitive-zabaione-447fd7/overview](https://app.netlify.com/sites/inquisitive-zabaione-447fd7/overview) 

**Netlify for Photo Portfolio**

* This combined with Fastmail for email should totally satisfy my entire photo portfolio use-case, for way less than the Squarespace cost (~$20/month). Plus, it’s more customizable and low maintenance with the “deploy on git push” options.

## Analytics

https://samjentsch.goatcounter.com

## Portfolio README

Prereqs/Configuration:

- [Install Node](https://nodejs.org/en/download/) - need to `chmod` the directories to your user to avoid `eaccess` issues.
- Install and configure [Netlify CLI](https://docs.netlify.com/cli/get-started/#authentication).
- Link Git project to Netlify

## Adding Images

* Add a portfolio folder to the `/images` directory
* Add a `desktop` and `mobile` directory.
* Add the desktop and mobile sized images.
* Create a new portfolio in `portfolios.js`, a new page for the porfolio, and an
  entry in the header (`header.html`, `header.js`).

Then commit and push to origin. The images are just stored in Github directly.

I was using Netlify Large Media, but this was deprecated and the image resizing
was not working.

#### Install Web P Converter and Convert Images

https://formulae.brew.sh/formula/webp
https://developers.google.com/speed/webp/docs/using

Run:

```
for file in images/*; do cwebp "$file" -o "${file%.*}.webp"; done
```

To convert all images to webp format.

```
rm *.jpg
```

To delete the non-converted images.

# Local Development

```
python3 -m http.server 8000
```
