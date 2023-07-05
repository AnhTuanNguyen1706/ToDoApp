"use client";
import Image from "next/image";
import Icon from "@mui/material/Icon";
import AddIcon from "@mui/icons-material/Add";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { format } from "date-fns";
import { Reorder } from "@mui/icons-material";

export default function Home() {
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 9000);
  };

  const handleKeyUp = (key) => {
    if (key == "Enter" && newTodo) {
      const randomNumber = getRandomNumber();
      const newItem = {
        id: `item-${randomNumber}`,
        content: newTodo,
      };

      setTodo(todo.concat(newItem));

      setNewTodo("");
    }
  };

  const handleDelete = (id) => {
    if (id > -1) {
      setTodo(todo.slice(0, id).concat(todo.slice(id + 1)));
    }
  };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    const item = reorder(todo, source.index, destination.index);

    setTodo(items);
  };
  return (
    <>
      <div className="flex justify-center pt-40">
        <div className="max-w-sm w-full shadow-lg bg-white p-8 rounded-2xl opacity-90">
          <div className="flex justify-center cursor-default bg-gray-200 rounded-3xl px-4 py-1 color-gray hover:scale-110 transition-all">
            <img
              className="object-cover rounded-full w-16 h-16 m-2"
              src="https://avatars.githubusercontent.com/u/134624148?v="
              alt="AnhTuan"
            ></img>
            <div className="w-full p-3">
              <p className="text-3xl text-gray-600">Todo List</p>
              <p className="text-sm">{format(new Date(), "MMMM d, yyyy")}</p>
            </div>
          </div>

          <div className="relative mt-10">
            <div className="absolute inset-y-0 left-2 flex items-center pl-3 pointer-events-none">
              <AddCircleTwoToneIcon
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: "0",
                  left: "10px",
                  transform: "translateY(-50%)",

                  pointerEvents: "none",
                }}
              />
            </div>
            <input
              type="text"
              id="newTodo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyUp={(e) => handleKeyUp(e.key)}
              className="block w-full pl-10 p-2 border-4 rounded-full bg-gray-600 text-white"
              placeholder="Add a new todo item"
            />
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(droppableProvided) => (
                <div
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                >
                  <ul className="block w-full pt-2">
                    {todo?.map((item, index) => {
                      return (
                        <Draggable
                          draggableId={item.id}
                          key={item.id}
                          index={index}
                        >
                          {(draggableProvided) => (
                            <div
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                              ref={draggableProvided.innerRef}
                            >
                              <li
                                key={item.id}
                                className="w-full border-2 rounded-xl mt-2 hover:border-blue-300"
                              >
                                <input
                                  id={index}
                                  type="checkbox"
                                  className="float-left block w-6 h-6 m-3"
                                />
                                <button
                                  id={index}
                                  onClick={() => handleDelete(index)}
                                  className="float-right w-7 h-7 m-2.5 rounded-2xl bg-red-700 text-gray-200 shadow-md hover:bg-red-500 hover:scale-105"
                                >
                                  x
                                </button>
                                <label
                                  htmlFor={index}
                                  className="block w-full p-3"
                                >
                                  {item.content}
                                </label>
                              </li>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  </ul>
                  {droppableProvided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </>
  );
}
