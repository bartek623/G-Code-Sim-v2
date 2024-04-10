# GCode Simulator

Simple project that draws two dimensional lines on flat XY plane from given program written in GCODE.
It simulates how tool of CNC machine moves with given program.

## TODO

-✅ Prepare 3D canvas
-✅ Implement camera controls
-✅ Prepare drawer with text area for gcode
-✅ Interprete gcode to data about lines (type, coords of ending, center of arc etc.)
-🚧 Create better validation of gcode
-✅ Draw lines on 2D plane
-✅ Draw different line types
-✅ Create drawer to save/load program (for now it can be local storage)
-✅ Create snackbar with appropriate notifications (e.g. on program save, errors etc.)
-✅ Error handling
-✅ Extrude model with given lines (by rotation around X axis)
-🐛 Find way to extrude concave model
-✅ Create modals with info about program, saving/loading models etc.
-🚧 Add unit tests
-❔ Create option to import/export model (e.g. .step file)
-❔ Create simple documentation
