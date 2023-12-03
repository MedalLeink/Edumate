import React from "react";

function AddCourse() {
  return (
    <div className="container">
      <h3>Add Course Material</h3>

      <form>
        <label>Title</label>
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
        <label>Description</label>
        <br />
        <textarea className="textarea"></textarea>
        <br />
        <br />
        <input type="submit" className="button" />
      </form>
    </div>
  );
}

export default AddCourse;
