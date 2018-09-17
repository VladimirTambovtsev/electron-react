import React, { Component } from "react";

class TasksIndex extends Component {
  renderActionButtons() {
    if (this.props.timer.active) {
      return (
        <div style={styles.buttonContainer}>
          <button className="btn red" onClick={() => this.props.onTimerStop()}>
            Stop Timer
          </button>
        </div>
      );
    }

    return (
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          className="btn green"
          onClick={() => this.props.onTimerStart()}
        >
          Start Timer
        </button>
        <button
          className="btn grey"
          style={{opacity: 0.6}}
          onClick={() => this.props.onTaskDeactivate(this.props.activeTask)}
        >
          Deactivate Task
        </button>
      </div>
    );
  }

  render() {
    const { activeTask, timer } = this.props;

    if (!activeTask) {
      return (
        <div style={styles.container}>
          <h5>
            No Active tasks.
          </h5>
        </div>
      );
    }

    return (
      <div style={styles.container}>
        <h4>Time Left <h5>{timer.display}</h5></h4>
        <h6>{`Current Task: ${activeTask.task}`}</h6>
        {this.renderActionButtons()}
      </div>
    );
  }
}

const styles = {
  container: {
    height: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    textAlign: "center",
    opacity: 0.95
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column"
  },
  button: {
    marginBottom: "5px"
  }
};

export default TasksIndex;
