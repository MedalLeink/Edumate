import React from "react";

function AddScore() {
  return (
    <div className="container">
      <h3>Add Score</h3>

      <form>
        <label>Student Email</label>
        <br />
        <input type="text" className="input-fields" />
        <br />
        <br />
        <label>Level</label>
        <br />
        <select className="input-fields">
          <option value="100L">100L</option>
          <option value="200L">200L</option>
          <option value="300L">300L</option>
        </select>
        <br />
        <br />
        <label>Score</label>
        <br />
        <input type="number" className="input-fields" />
        <br />
        <br />
        <input type="submit" className="button" />
      </form>
    </div>
  );
}

export default AddScore;
