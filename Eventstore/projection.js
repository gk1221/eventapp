options({
  resultStreamName: "order_result",
  $includeLinks: false,
  reorderEvents: false,
  processingLag: 0,
});

fromStream("orderconference")
  .when({
    $init: function () {
      return {
        sum: 0,
        userA: 0,
        userB: 0,
        thing: "order-UFO",
      };
    },
    "order-UFO": function (state, event) {
      state.sum += event.data.increment;
      var user = event.metadata.name;

      if (user === "userA") state.userA += event.data.increment;
      else state.userB += event.data.increment;
    },
  })
  .transformBy(function (state) {
    return state;
  })
  .outputState();
