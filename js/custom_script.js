(function ($) {
  $(document).ready(function () {
    if ($(".layout-content--viewnabidka-pracipage-1").length > 0) {
      let rows = document.querySelectorAll(".views-col .views-row");
      let countItems = document.createElement("span");
      countItems.classList.add("counter");
      countItems.innerHTML = "Nalezených nabídek: " + rows.length;

      if (rows.length) {
        document.querySelector(".views-exposed-form").after(countItems);
        addButton("button");
        showItems();
      }
    }

    $(".btn--show-more").click(function () {
      showItems();
    });

    let addText = "<span>Zvýraznit</span>";

    // let buttonUploadImage = "<div class='upload-button'><span class='upload-button__text'>Nahrát soubor</span></div>";
    // $('#edit-field-logo-0--label').append(buttonUploadImage);
    $(".form-item-field-topovat-value").prepend(addText);
    $("#edit-title-0-value").attr("maxlength", "80");

    if ($(".layout-content--add-job-offer").length > 0) {
      console.log("Pridat nabidku");
      $(
        "#node-nabidka-prace-nova-form #edit-scheduler-settings #edit-unpublish-on-0-value"
      )
        .get(0)
        .nextSibling.remove();
      $("#node-nabidka-prace-nova-form #edit-scheduler-settings h4").text(
        "Nabídka bude skryta dne:"
      );
      let h4 = $("#node-nabidka-prace-nova-form #edit-scheduler-settings h4")[0]
        .outerHTML;
      let date = $(
        "#node-nabidka-prace-nova-form #edit-scheduler-settings #edit-unpublish-on-0-value"
      )[0].outerHTML;
      let summary = $(
        "#node-nabidka-prace-nova-form #edit-scheduler-settings summary"
      )[0].outerHTML;
      console.log(summary);
      $("#node-nabidka-prace-nova-form #edit-scheduler-settings").empty();
      $("#node-nabidka-prace-nova-form #edit-scheduler-settings").prepend(
        "<div class='wrapper wrapper--end-date-of-publish'></div>"
      );
      $("#node-nabidka-prace-nova-form #edit-scheduler-settings").prepend(
        summary
      );
      $(
        "#node-nabidka-prace-nova-form #edit-scheduler-settings .wrapper"
      ).after("<p></p>");
      $("#node-nabidka-prace-nova-form .wrapper--end-date-of-publish").append(
        h4
      );
      $("#node-nabidka-prace-nova-form .wrapper--end-date-of-publish").append(
        date
      );
    }
    // $(
    //   "#node-nabidka-prace-nova-form #edit-scheduler-settings #edit-unpublish-on-0-value"
    // ).after(
    //   "<p>Tady může být vhodný text pro skrývání inzerátu. Nebo taky ne.</p>"
    // );

    $('a[href$="#"]').click(function (e) {
      e.preventDefault();
    });
  });

  // $("div#edit-abc .form-item label").on('click', function(){
  //      $(this).toggleClass("exposed-checked");
  // });

  var selected = $("div#edit-abc .form-item input:checked");
  $(selected).next("label").addClass("exposed-checked");

  $('a[href^="#"').click(function (event) {
    var addressValue = $(this).attr("href");
    var pos = $(addressValue).position();
    //console.log(pos);
    //console.log(addressValue);
    $("html").scrollTop(pos.top);
    event.preventDefault();
  });

  let wrapper = "";
  $("#edit-field-topovat-value").click(function () {
    if ($(this).is(":checked")) {
      $("div[id^='ajax-wrapper']").show();
      $(".form-item-field-pocet-dnu-0-value").show();
      wrapper = $("div[id='ajax-wrapper']");
      // if( $("#edit-field-logo-0-upload").get(0).files.length === 0 ){
      //     console.log("no files selected");
      // }
    } else {
      //$("div[id^='ajax-wrapper']").remove();
      //console.log(wrapper);
      $("input[data-drupal-selector=edit-field-logo-0-fids").val("");
      //$("input[name='field_logo_0_remove_button']").click();
      // $('.form-item-field-topovat-value').after(wrapper);
      $("div[id^='ajax-wrapper']").hide();
      $(".form-item-field-pocet-dnu-0-value").hide();
      // $('#ajax-wrapper').hide();
    }
  });

  $(".form-item-field-pocet-dnu-0-value").append(
    '<span class="cena-label">Cena: </span><span id="cena-zvyrazneni">100 Kč</span>'
  );
  $("#edit-field-pocet-dnu-0-value").change(function () {
    let hodnota = $(this).val();
    //console.log(hodnota);
    $("#cena-zvyrazneni").text(hodnota * 100 + " Kč");
  });
})(jQuery);

function showItems() {
  let items = document.querySelectorAll(".views-col .views-row");
  let count = 0;
  let last = items[items.length - 1];

  items.forEach(function (r) {
    if (r.style.display === "" && count < 8) {
      // console.log(r + " " + i);
      r.style.display = "flex";
      count++;
    }
    // console.log(r.style.display);
  });

  // console.log("Last: " + last);
  if (last.style.display === "flex") {
    removeButton();
    if (!isFilterRunning()) addButton("a");
  }
}

function addButton(type) {
  let newNode = document.createElement(type);
  if (type === "a") {
    newNode.href = "/jobs-old-2020";
    newNode.innerHTML = "Přejít na starší nabídky";
  } else {
    newNode.innerHTML = "Načíst další";
  }
  newNode.classList.add("btn", "btn--show-more");

  document.querySelector(".views-col").append(newNode);
}

function removeButton() {
  let btn = document.querySelector(".btn--show-more");
  btn.parentNode.removeChild(btn);
}

function isFilterRunning() {
  if (
    document.getElementById("edit-field-koho-hledame-list-value").value ===
      "All" &&
    document.getElementById("edit-field-kraj-value").value === "All" &&
    document.getElementById("edit-field-uvazek-list-value").value === "All"
  ) {
    return false;
  }

  return true;
}
