$('.words').on('keyup change', function() {
  var text = $(this).val();
  location.hash = "t=" + text;

  if (text.toLowerCase() == "sunjay") {
    document.body.classList.add("rainbow-bg");
    $('.rgb-color').text("RAINBOW!!!!");
    $('.hex-color').text("");
    return;
  }
  document.body.classList.remove("rainbow-bg");

  var color = textToColor(text);
  var colorString = "rgb(" + color.join(", ") + ")";
  var hexString = rgbToHex(color[0], color[1], color[2]).toUpperCase();

  $('.rgb-color').text(colorString);
  $('.hex-color').text(hexString);
  $('body').css('background-color', colorString);
});

$(window).on('hashchange', function() {
  var parsedHash = /t\=([^&]*)/.exec(location.hash) || [];
  var text = decodeURIComponent(parsedHash[1] || "");
  $('.words').val(text).change();
}).trigger('hashchange');

$('.words').change();

function textToColor(text) {
  var color = [255, 255, 255];

  var thirdTextLength = text.length / 3;
  for (var color_i = 0; color_i < color.length; color_i++) {
    for (var i = color_i * thirdTextLength; i < (color_i + 1) * thirdTextLength; i++) {
      var char = text.charCodeAt(i);
      color[color_i] = Math.floor(color[color_i] + char * 7 / 4 + 32) % 255;
    }
  }

  return color;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
