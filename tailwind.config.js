module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend:{   
      backgroundImage: theme => ({
        'imageid1' : "url('/public/images/bgfoto1.jpg')",
        'imageid2' : "url('/public/images/bgfoto2.jpg')",
        'imageid3' : "url('/public/images/bgfoto3.jpg')",
      }),
    },
  },
  plugins: [],
}
