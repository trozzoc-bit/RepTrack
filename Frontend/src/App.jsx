import { useState } from "react";

function App() {
  const [dayName, setDayName] = useState("");
  const [trainingDays, setTrainingDays] = useState([]);
  const [openDayId, setOpenDayId] = useState(null);

  const [exerciseInputs, setExerciseInputs] = useState({});

  const handleAddDay = () => {
    if (dayName.trim() === "") return;

    const newDay = {
      id: Date.now(),
      name: dayName,
      exercises: [],
    };

    setTrainingDays([...trainingDays, newDay]);
    setDayName("");
  };

  const toggleDay = (dayId) => {
    setOpenDayId(openDayId === dayId ? null : dayId);
  };

  const handleExerciseInputChange = (dayId, field, value) => {
    setExerciseInputs({
      ...exerciseInputs,
      [dayId]: {
        ...exerciseInputs[dayId],
        [field]: value,
      },
    });
  };

  const handleAddExercise = (dayId) => {
    const dayInputs = exerciseInputs[dayId] || {};

    if (
      !dayInputs.exerciseName?.trim() ||
      !dayInputs.sets?.trim() ||
      !dayInputs.reps?.trim()
    ) {
      return;
    }

    const newExercise = {
      id: Date.now(),
      exerciseName: dayInputs.exerciseName,
      sets: dayInputs.sets,
      reps: dayInputs.reps,
      comments: dayInputs.comments || "",
    };

    const updatedDays = trainingDays.map((day) => {
      if (day.id === dayId) {
        return {
          ...day,
          exercises: [...day.exercises, newExercise],
        };
      }
      return day;
    });

    setTrainingDays(updatedDays);

    setExerciseInputs({
      ...exerciseInputs,
      [dayId]: {
        exerciseName: "",
        sets: "",
        reps: "",
        comments: "",
      },
    });
  };

  return (
    <div
      style={{
        padding: "24px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1>RepTrack</h1>

      <h2>Add Training Day</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="Enter day name..."
          value={dayName}
          onChange={(e) => setDayName(e.target.value)}
          style={{
            padding: "10px",
            flex: 1,
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleAddDay}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Day
        </button>
      </div>

      <h2>My Training Days</h2>

      {trainingDays.length === 0 ? (
        <p>No training days yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {trainingDays.map((day) => {
            const isOpen = openDayId === day.id;
            const dayInputs = exerciseInputs[day.id] || {
              exerciseName: "",
              sets: "",
              reps: "",
              comments: "",
            };

            return (
              <div
                key={day.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <h3 style={{ margin: 0 }}>{day.name}</h3>
                  <button
                    onClick={() => toggleDay(day.id)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      background: "white",
                      cursor: "pointer",
                    }}
                  >
                    {isOpen ? "Close" : "Open"}
                  </button>
                </div>

                {isOpen && (
                  <div style={{ marginTop: "16px" }}>
                    <h4>Exercises</h4>

                    {day.exercises.length === 0 ? (
                      <p>No exercises added yet.</p>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          marginBottom: "20px",
                        }}
                      >
                        {day.exercises.map((exercise) => (
                          <div
                            key={exercise.id}
                            style={{
                              display: "flex",
                              gap: "16px",
                              alignItems: "center",
                              flexWrap: "wrap",
                              padding: "10px 12px",
                              border: "1px solid #eee",
                              borderRadius: "8px",
                              backgroundColor: "#fafafa",
                            }}
                          >
                            <span>
                              <strong>Exercise:</strong> {exercise.exerciseName}
                            </span>
                            <span>
                              <strong>Sets:</strong> {exercise.sets}
                            </span>
                            <span>
                              <strong>Reps:</strong> {exercise.reps}
                            </span>
                            <span>
                              <strong>Comments:</strong>{" "}
                              {exercise.comments || "None"}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <h4>Add Exercise</h4>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Exercise name"
                        value={dayInputs.exerciseName}
                        onChange={(e) =>
                          handleExerciseInputChange(
                            day.id,
                            "exerciseName",
                            e.target.value
                          )
                        }
                        style={{
                          padding: "10px",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
                        }}
                      />

                      <input
                        type="number"
                        placeholder="Sets"
                        value={dayInputs.sets}
                        onChange={(e) =>
                          handleExerciseInputChange(
                            day.id,
                            "sets",
                            e.target.value
                          )
                        }
                        style={{
                          padding: "10px",
                          width: "90px",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
                        }}
                      />

                      <input
                        type="number"
                        placeholder="Reps"
                        value={dayInputs.reps}
                        onChange={(e) =>
                          handleExerciseInputChange(
                            day.id,
                            "reps",
                            e.target.value
                          )
                        }
                        style={{
                          padding: "10px",
                          width: "90px",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
                        }}
                      />

                      <input
                        type="text"
                        placeholder="Comments (optional)"
                        value={dayInputs.comments}
                        onChange={(e) =>
                          handleExerciseInputChange(
                            day.id,
                            "comments",
                            e.target.value
                          )
                        }
                        style={{
                          padding: "10px",
                          minWidth: "220px",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
                        }}
                      />

                      <button
                        onClick={() => handleAddExercise(day.id)}
                        style={{
                          padding: "10px 16px",
                          borderRadius: "8px",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Add Exercise
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;