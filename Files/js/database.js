var DB_ItemTypes;

if (typeof TAFFY === "undefined") {
  alert("TaffyDB not loaded!");
} else {
  DB_ItemTypes = TAFFY();
  DB_ItemTypes.store("gw2stuff_ItemTypes");

}
