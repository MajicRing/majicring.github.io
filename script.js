// change prices for each category here
var prices = {
  plant: 3,
  animal: 8,
  human: 4
}

// each item's category and full name
var itemInfo = {
  sea: {
    type: "human",
    name: "Celine Zhang",
    img: "sea.png"
  },
  brain: {
    type: "plant",
    name: "Brain",
    img: "brain.png"
  },
  pig: {
    type: "animal",
    name: "Peppa Pig",
    img: "pig.png"
  },
  duck: {
    type: "animal",
    name: "Donald Duck",
    img: "duck.png"
  },
  leaf: {
    type: "plant",
    name: "Leaf",
    img: "leaf.jpg"
  },
  ashley: {
    type: "human",
    name: "Ashley Qi",
    img: "ashley.jpeg"
  }
}

// form questions for each individual item
var itemForm = {
  sea: [ // item ID (should match the ID on the HTML element)
    {
      question: "Facial expression", // the text that shows up
      name: "face", // make up a question ID
      options: [
        { id: "happy", value: "HAPPY: sees a doggo in a car", color: "" },
        { id: "bored", value: "BORED: falling asleep in spanish class", color: "" },
        { id: "sad", value: "CRYING: remembering 2024 president choices", color: "" },
        { id: "openMouth", value: "OPEN MOUTH: unhinging jaw to consume food", color: "" }
        // wait whats wrong with open mouth uhhhhhhh ok i think it was ohhhh makes cents cuz the id was the same as the crying? oh uhhh ok could u add a checkbox for keychain or no keychain like ig some ppl dont want keychains 
      ]
    },
    {
      question: "Accessories",
      name: "addons",
      options: [
        { id: "hat", value: "Mini blue crochet hat (+$1)", color: "" },
        { id: "none", value: "No accessories", color: "" }
      ]
    },
    {
      question: "Size",
      name: "size",
      options: [
        { id: "small", value: "Small", color: "" },
        { id: "medium", value: "Medium", color: "" }
      ]
    }
  ],
  brain: [
    {
      question: "IQ",
      name: "iq",
      options: [
        { id: "dumb", value: "Dumb (-900)", color: "" },
        { id: "avg", value: "Average (100)", color: "" },
        { id: "smart", value: "Smart (500)", color: "" },
        { id: "cashley", value: "Cashley (∞)", color: "" },
      ]
    },
    // {
    //   question: "Color",
    //   name: "color",
    //   options: [
    //     { id: "lgreen", value: "Light green", color: "lightgreen" },
    //     { id: "dgreen", value: "Dark green", color: "darkgreen" }
    //   ]
    // }
  ],
  ashley: [ // item ID (should match the ID on the HTML element)
    {
      question: "Facial expression", // the text that shows up
      name: "face", // make up a question ID
      options: [
        { id: "happy", value: "HAPPY: had a keychain made of her", color: "" },
        { id: "bored", value: "BORED: chilling in Alg 2 Trig because the class is too easy", color: "" },
        { id: "sad", value: "SAD: got kicked out of JV debate for being too good", color: "" },
        { id: "openMouth", value: "OPEN MOUTH: yawning during class due to sleep deprivation", color: "" },
      ]
    },
    // {
    //   question: "Accessories",
    //   name: "addons",
    //   options: [
    //     { id: "hat", value: "Mini blue crochet hat", color: "" },
    //     { id: "none", value: "No accessories", color: "" }
    //   ]
    // },
    {
      question: "Size",
      name: "size",
      options: [
        { id: "small", value: "Small", color: "" },
        { id: "medium", value: "Medium", color: "" }
      ]
    }
  ]
};

// when you click an item, it saves what item you clicked (like "duck")
$(".orderLink").click(function() {
  var item = $(this).parent().attr("id");
  sessionStorage.setItem("item", item);
  console.log(sessionStorage.getItem("item"));
})

// makes a multiple choice question
function createMCQ(form, item) {
  item.forEach(function(mcq) {
    $(form).append(`<label class="input" for="${mcq.name}">${mcq.question}</label> <br>`);
    // var mcqOption =
    mcq.options.forEach(function(option) {
      $(form).append(`<label for="${option.id}" style="margin-top: 5px;" class="radioContainer">
       <input type="radio" id="${option.id}" name="${mcq.name}" value="${option.value}" class="input" required>
       <span class="radio input"></span>`);
      optionLabel = $(`label[for=${option.id}]`);
      if (option.color !== "") {
        $(optionLabel).append(`<span class="swatch" style="background-color: ${option.color};"></span>`);
      }
      $(optionLabel).append(` ${option.value}</label> <br>`);
    });
    $(form).append("<br>");
  })
}

// stuff to do on the "meet the team" page
if (window.location.pathname == "/team.html") {
  var ws = $("#worship"); // worshipping animation :0

  // the worshipper follows the mouse
  $(document).mousemove(function(e) { // when the mouse moves
    ws.css({
      display: "block", // show worshipper
      // e.pageX & e.pageY are the mouse coordinates, but you have to subtract because it's offset for some reason
      left: (e.pageX - 105) + "px",
      top: (e.pageY - 300) + "px"
    });
  })
}

// hide chinner after u scroll down
$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $("#chinner").hide();
    if ($(window).width() > 870) {
      $("#carousel").css("margin-top", "-168px");
      $("#itemName").css("margin-top", "162px");
      $("#price").css("margin-top", "192px");
      $("#facialX").css("margin-top", "-18px");
    }
  } else {
    $("#chinner").show();
    if ($(window).width() > 870) {
      $("#carousel").css("margin-top", "-100px");
      $("#itemName").css("margin-top", "230px");
      $("#price").css("margin-top", "260px");
      $("#facialX").css("margin-top", "50px");
    }
  }
});

// stuff to do on the order page
if (window.location.pathname == "/order.html") {
  var item = new URLSearchParams(window.location.search).get("item");
  if (item == null) {
    if (sessionStorage.getItem("item") !== null) {
      item = sessionStorage.getItem("item"); // the item you clicked
    } else {
      item = "ashley";
    }
  }

  $("#item").attr("value", item);

  // show picture of selected item
  $("#carousel").attr("src", `images/items/${itemInfo[item].img}`);

  // show name and price of selected item
  $("#itemName")[0].innerHTML += itemInfo[item].name;
  $("#price")[0].innerHTML += `$${prices[itemInfo[item].type]}`;

  // update form based on what item u clicked (customization etc.)
  updateForm();

  // change price when accessories are added
  $("input[name='addons']").change(function() {
    if (this.id !== "none") {
      $("#price")[0].innerHTML = `$${prices[itemInfo[item].type] + 1}`;
    } else {
      $("#price")[0].innerHTML = `$${prices[itemInfo[item].type]}`;
    }
  });

  // change price based on size
  $("input[name='size']").change(function() {
    if (this.id == "medium") {
      $("#price")[0].innerHTML = `$${prices[itemInfo[item].type] + 1}`;
    } else {
      $("#price")[0].innerHTML = `$${prices[itemInfo[item].type]}`;
    }
  });

  // change facial expression
  $("input[name='face']").change(function() {
    $("#facialX").attr("src", `images/items/faces/${this.id}.png`);
    console.log($("facialX").attr("src"));
  });

  // when u submit, it disables submit button and sends ur answers to the google sheet
  var form = $("#orderForm")[0];
  $(form).submit(function(e) { // when you submit the form
    e.preventDefault(); // don't reload to this random weird page
    $("#submit").attr("disabled", true); // disable submit button
    $("#submit").html("<i>Ordering...</i>");
    // idk how this works but it sends to google sheet
    var data = new FormData(form);
    var action = e.target.action;
    fetch(action, {
      method: "POST",
      body: data,
    })
      .then(() => {
        $("#submit").html("Ordered!");
        $("#thx").show();
      })
  });
}

// update form based on what item you clicked
function updateForm() {
  var form = $("#itemForm")[0];

  // Clear previous form fields
  form.innerHTML = "";

  if (itemForm[item] !== undefined) {
    createMCQ(form, itemForm[item]);
  }
}
