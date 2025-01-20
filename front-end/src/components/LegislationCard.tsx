import { manipulateDateAndTime } from "../utils/utils";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface LegislationCardProps {
  title: string;
  date: string;
  categories: string[];
}

function LegislationCard({ title, date, categories }: LegislationCardProps) {
  // return (
  //   <div
  //     id="LegCard-1"
  //     className="md:m-3 m-1 bg-green-200 p-3 rounded-md shadow-md hover:brightness-90 w-full"
  //   >
  //     <h2 id="LegCard-2" className="md:text-xl text-base">
  //       {title}
  //     </h2>
  //     <p className="md:text-lg text-sm">
  //       <strong>Categories: </strong>
  //       {categories.map((category) => {
  //         if (categories.length > 1) {
  //           return `${category}, `;
  //         } else {
  //           return category;
  //         }
  //       })}
  //     </p>

  //     <p className="md:text-lg text-sm">
  //       <strong>Date:</strong> {manipulateDateAndTime(date)}
  //     </p>
  //     <Button variant="contained">Find out more</Button>
  //   </div>
  // );

  return (
    <Card
    sx={{
      minWidth: 200,
      height: 250,
      background: "white",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 1,
      boxShadow: 3,
      overflow: "hidden", // Ensure content doesn't spill out
    }}
    >
      <CardContent sx={{ textAlign: "center", padding: 1 }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "1.2rem", // Font size for extra-small devices (e.g., phones)
              sm: "1.2rem", // Font size for small devices (e.g., tablets)
              md: "1.5rem", // Font size for medium and larger devices
            },
            color: "black",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            mb: 2,
            overflow: "hidden",
            textOverflow: "ellipsis", // Adds "..." for overflowing text
            fontFamily: "'Open Sans', serif", // Explicitly set the font
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            color: "black",
            fontSize: {
              xs: "0.9rem", // Font size for extra-small devices (e.g., phones)
              sm: "0.9rem", // Font size for small devices (e.g., tablets)
              md: "1rem", // Font size for medium and larger devices
            },
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap", // Prevent wrapping
          }}
        >
          <strong>Categories:</strong>{" "}
          {categories.length > 3
            ? `${categories.slice(0, 3).join(", ")}...` // Show up to 3 categories
            : categories.join(", ")}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontSize: {
              xs: "0.9rem", // Font size for extra-small devices (e.g., phones)
              sm: "0.9rem", // Font size for small devices (e.g., tablets)
              md: "1rem", // Font size for medium and larger devices
            },
            color: "rgba(0, 0, 0, 1)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontStyle: "italic",
            fontFamily: "'Open Sans', serif", // Explicitly set the font
          }}
        >
          <strong>Date:</strong> {manipulateDateAndTime(date)}
        </Typography>
      </CardContent>

      {/* Button */}
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            sx={{
              fontWeight: "bold",
              fontSize: "0.9rem",
              fontFamily: "'Open Sans', serif", 
              backgroundColor: "white",
              color: "black",
              "&:hover": {
                backgroundColor: "lightgray",
              },
              padding: "4px 8px", // Smaller padding for the button
            }}
          >
            Find out more
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default LegislationCard;
