import { AnyAction } from "redux";
import {
  MOVE_SECTION,
  MOVE_TICKET_WITHIN_SAME_SECTION,
  MOVE_TICKET_FROM_ONE_SECTION_TO_ANOTHER,
  ADD_SECTION,
  REMOVE_SECTION,
  ADD_TICKET,
  REMOVE_TICKET,
  addSection,
} from "../actions/boardActions";
import { data } from "../components/models/initData";

const initialData = data;

function boardReducer(state = initialData.sections, action: AnyAction) {
  type stateType = typeof state;

  switch (action.type) {
    case MOVE_SECTION:
      const newSections = [...state.allIds];
      newSections.splice(action.payload.from, 1);
      newSections.splice(
        action.payload.to,
        0,
        state.allIds[action.payload.from]
      );
      return {
        ...state,
        allIds: newSections,
      } as stateType;

    case MOVE_TICKET_WITHIN_SAME_SECTION:
      const section = { ...state.byId[action.payload.fromSectionId] };
      const sectionTickets = section.tickets;
      const ticketToMove = sectionTickets[action.payload.fromIndex];
      sectionTickets.splice(action.payload.fromIndex, 1);
      sectionTickets.splice(action.payload.toIndex, 0, ticketToMove);
      return {
        ...state,
        byId: {
          ...state.byId,
          [section.id]: section,
        },
      } as stateType;

    case MOVE_TICKET_FROM_ONE_SECTION_TO_ANOTHER:
      const sourceSection = { ...state.byId[action.payload.fromSectionId] };
      const destinationSection = { ...state.byId[action.payload.toSectionId] };
      const sourceTickets = sourceSection.tickets;
      const destinationTickets = destinationSection.tickets;
      const ticketToMove2 = sourceTickets[action.payload.fromIndex];
      sourceTickets.splice(action.payload.fromIndex, 1);
      destinationTickets.splice(action.payload.toIndex, 0, ticketToMove2);
      return {
        ...state,
        byId: {
          ...state.byId,
          [sourceSection.id]: sourceSection,
          [destinationSection.id]: destinationSection,
        },
      } as stateType;

    case ADD_SECTION:
      let act = action as ReturnType<typeof addSection>;
      const newSection = {
        id: act.payload.sectionId,
        title: act.payload.sectionTitle,
        tickets: [],
      };

      return {
        ...state,
        byId: {
          ...state.byId,
          [act.payload.sectionId]: newSection,
        },
        allIds: [...state.allIds, act.payload.sectionId],
      } as stateType;

    case REMOVE_SECTION:
      return {
        ...state,
      } as stateType;

    case ADD_TICKET:
      return {
        ...state,
      };

    case REMOVE_TICKET:
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default boardReducer;
