import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskBoard = () => {
  const [columns, setColumns] = useState({
    todo: {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: 't1', title: 'Follow up with lead', priority: 'high' },
        { id: 't2', title: 'Prepare campaign report', priority: 'medium' }
      ]
    },
    inProgress: {
      id: 'inProgress',
      title: 'In Progress',
      tasks: [
        { id: 't3', title: 'Client onboarding', priority: 'high' }
      ]
    },
    done: {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: 't4', title: 'Email campaign setup', priority: 'low' }
      ]
    }
  });

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    
    if (!destination) return;
    if (source.droppableId === destination.droppableId && 
        source.index === destination.index) return;

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];
    const task = start.tasks.find(t => t.id === draggableId);

    if (start === finish) {
      const newTasks = [...start.tasks];
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, task);
      
      setColumns({
        ...columns,
        [start.id]: {
          ...start,
          tasks: newTasks
        }
      });
    } else {
      const startTasks = [...start.tasks];
      startTasks.splice(source.index, 1);
      const finishTasks = [...finish.tasks];
      finishTasks.splice(destination.index, 0, task);
      
      setColumns({
        ...columns,
        [start.id]: {
          ...start,
          tasks: startTasks
        },
        [finish.id]: {
          ...finish,
          tasks: finishTasks
        }
      });
    }
  };

  return (
    <Container fluid className="task-board">
      <div className="d-flex justify-content-between mb-4">
        <h2>Task Board</h2>
        <Button variant="primary">Create Task</Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Row>
          {Object.values(columns).map(column => (
            <Col key={column.id} md={4}>
              <Card className="kanban-column">
                <Card.Header>
                  <h5>{column.title} <Badge bg="secondary">{column.tasks.length}</Badge></h5>
                </Card.Header>
                <Card.Body>
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="task-list"
                      >
                        {column.tasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="task-card"
                              >
                                <div className={`priority-${task.priority}`}></div>
                                <div className="task-title">{task.title}</div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </DragDropContext>
    </Container>
  );
};

export default TaskBoard;