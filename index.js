const colors = [
  "#ffffff",
  "#ffe4da",
  "#ffc8b6",
  "#ffac93",
  "#ff8f70",
  "#ff704f",
  "#ff0000",
];

let selected = "p.building";

let line_color = {
  property: selected,
  stops: [
    [0, colors[0]],
    [0.003154704, colors[1]],
    [0.008878906, colors[2]],
    [0.013958903, colors[3]],
    [0.019291667, colors[5]],
    [0.025133464, colors[6]],
  ],
};

//Token
mapboxgl.accessToken =
  "pk.eyJ1IjoiYm9ud29va29vIiwiYSI6ImNsODU2a2RxYjBtaWMzdnF1dXV4aXBoM3kifQ.AYn20hMHEpDqZyun5_vI3A";

// Selected value from dropdown
let var_select = document.getElementById("dropdown");

var_select.addEventListener("change", function () {
  line_color = {
    property: var_select.value,
    stops: [
      [0, colors[0]],
      [0.003154704, colors[1]],
      [0.008878906, colors[2]],
      [0.013958903, colors[3]],
      [0.019291667, colors[5]],
      [0.025133464, colors[6]],
    ],
  };
  lines.setPaintProperty("base_line", "line-color", line_color);
});

// CREATE BASE MAP
var lines = new mapboxgl.Map({
  container: "lines", // container element id
  style: "mapbox://styles/mapbox/dark-v10",
  center: [-84.42249441753262, 33.784321566409666], // initial map center in [lon, lat]
  zoom: 10,
  minZoom: 3,
});

// SOURCE
lines.on("load", () => {
  lines.addSource("pspnet_by_road", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/BonwooKoo/walk-streetscapes/main/PSPNet_4git.geojson",
  });

  // LAYER
  lines.addLayer({
    id: "base_line",
    type: "line",
    source: "pspnet_by_road",
    paint: {
      "line-color": line_color,
      "line-width": 1,
    },
  });
});
