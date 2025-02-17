import { createSlice } from '@reduxjs/toolkit';
import { Guide } from '../reducers';
import { RESET_APP_STATE } from '../../actions/resetState';

const initialState = {
  guide: {
    title: "",
    description: "",
    coverImage: null,
    guideType: null,
    startCity: null,
    endCity: null,
    startDate: null,
    endDate: null,
    status: null,
    practicalInfo: null,
    price: null,
    views: 0,
    createdAt: null,
    updatedAt: null,
    categories: [],
    address: null,
    stays: [],
    user: null
  },
  isGuideDirect: true,
  status: {
    guide: "idle",
  },
  error: null,
};
export const newGuideSlice = createSlice({
  name: 'guide',
  initialState,
  reducers: {
    setGuideData: (state, action) => {
      state.guide = { ...state.guide, ...action.payload };
    },
    
    setGuidePrice: (state, action) => {
      state.guide.price = action.payload;
    },
    
    setGuideCoverImage: (state, action) => {
      state.guide.coverImage = action.payload;
    },
    
    setGuideDescription: (state, action) => {
      state.guide.description = action.payload;
    },
    
    setGuidePracticalInfo: (state, action) => {
      state.guide.practicalInfo = action.payload;
    },
    
    addCategory: (state, action) => {
      if (state.guide.categories.length < 3) {
        state.guide.categories.push(action.payload);
      }
    },
    
    removeCategory: (state, action) => {
      state.guide.categories = state.guide.categories.filter(
        category => category.id !== action.payload
      );
    },
    
    addImage: (state, action) => {
      state.guide.images.push(action.payload);
    },
    
    removeImage: (state, action) => {
      state.guide.images = state.guide.images.filter(
        image => image.id !== action.payload
      );
    },
    
    addStay: (state, action) => {
      state.guide.stays.push(action.payload);
    },

    addEndCity: (state, action) => {
      state.guide.endCity = action.payload;
    },

    addTransport: (state, action) => {
      const { stayIndex, transport } = action.payload;
      state.guide.stays[stayIndex].departingTransports = [transport];
      state.guide.stays[stayIndex+1].arrivingTransports = [transport];
    },

    addDay: (state, action) => {
      const stayIndex = action.payload.stayIndex;
      const newDay = {
        id: Date.now(), // Temporaire, à remplacer par l'ID du backend
        date: action.payload.date,
        description: "",
        sections: []
      };
      state.guide.stays[stayIndex].days.push(newDay);
    },
    
    removeDay: (state, action) => {
      const { stayIndex, dayId } = action.payload;
      state.guide.stays[stayIndex].days = state.guide.stays[stayIndex].days.filter(
        day => day.id !== dayId
      );
    },
    
    setDayDescription: (state, action) => {
      const { stayIndex, dayId, description } = action.payload;
      const day = state.guide.stays[stayIndex].days.find(d => d.id === dayId);
      if (day) {
        day.description = description;
      }
    },
    
    addSection: (state, action) => {
      const { stayIndex, dayId, section } = action.payload;
      const day = state.guide.stays[stayIndex].days.find(d => d.id === dayId);
      if (day) {
        section.id = Date.now(); // Temporaire, à remplacer par l'ID du backend
        section.order = day.sections.length + 1;
        day.sections.push(section);
      }
    },
    
    removeSection: (state, action) => {
      const { stayIndex, dayId, sectionId } = action.payload;
      const day = state.guide.stays[stayIndex].days.find(d => d.id === dayId);
      if (day) {
        day.sections = day.sections.filter(section => section.id !== sectionId);
        // Réorganiser les ordres
        day.sections.forEach((section, index) => {
          section.order = index + 1;
        });
      }
    },
    
    updateSection: (state, action) => {
      const { stayIndex, dayId, sectionId, updates } = action.payload;
      const day = state.guide.stays[stayIndex].days.find(d => d.id === dayId);
      if (day) {
        const section = day.sections.find(s => s.id === sectionId);
        if (section) {
          Object.assign(section, updates);
        }
      }
    },
    // Dans newGuideSlice.js
addContentBlock: (state, action) => {
  const { stayIndex, dayId, sectionId, block } = action.payload;
  const day = state.guide.stays[stayIndex].days.find(d => d.id === dayId);
  if (day) {
      const section = day.sections.find(s => s.id === sectionId);
      if (section) {
          block.id = Date.now(); // Temporaire, à remplacer par l'ID du backend
          section.contentBlocks = section.contentBlocks || [];
          section.contentBlocks.push(block);
      }
  }
},

removeContentBlock: (state, action) => {
  const { stayIndex, dayId, sectionId, blockId } = action.payload;
  const day = state.guide.stays[stayIndex].days.find(d => d.id === dayId);
  if (day) {
      const section = day.sections.find(s => s.id === sectionId);
      if (section) {
          section.contentBlocks = section.contentBlocks.filter(
              block => block.id !== blockId
          );
      }
  }
},

updateContentBlock: (state, action) => {
  const { stayIndex, dayId, sectionId, blockId, updates } = action.payload;
  const day = state.guide.stays[stayIndex].days.find(d => d.id === dayId);
  if (day) {
      const section = day.sections.find(s => s.id === sectionId);
      if (section) {
          const block = section.contentBlocks.find(b => b.id === blockId);
          if (block) {
              Object.assign(block, updates);
          }
      }
  }
},
updateStayDates: (state, action) => {
  const { stayIndex, startDate, endDate } = action.payload;
  const stay = state.guide.stays[stayIndex];
  if (stay) {
      stay.startDate = startDate;
      stay.endDate = endDate;
  }
}
  },
  extraReducers(builder) {
    builder
    .addCase(Guide.createGuideDirect.pending, (state, action) => {
      state.status.guide = "pending";
    })
    .addCase(Guide.createGuideDirect.fulfilled, (state, action) => {
        state.status.guide = "succeed";
        state.guide = initialState.guide;
        state.error = null;
    })
    .addCase(Guide.createGuideDirect.rejected, (state, action) => {
        state.status.guide = "failed";
        if(action?.payload?.message){
            state.error = action.payload.message;
        }
    })
    .addCase(Guide.createGuideItinerary.pending, (state, action) => {
      state.status.guide = "pending";
    })
    .addCase(Guide.createGuideItinerary.fulfilled, (state, action) => {
        state.status.guide = "succeed";
        state.guide = initialState.guide;
        state.error = null;
    })
    .addCase(Guide.createGuideItinerary.rejected, (state, action) => {
        state.status.guide = "failed";
        if(action?.payload?.message){
            state.error = action.payload.message;
        }
    })
    .addCase(RESET_APP_STATE, (state, action) => initialState);
  },

});

export const {
  setGuideData,
  setGuidePrice,
  setGuideCoverImage,
  setGuideDescription,
  setGuidePracticalInfo,
  addCategory,
  removeCategory,
  addImage,
  removeImage,
  addStay,
  addTransport,
  addDay,
  addEndCity,
  removeDay,
  setDayDescription,
  addSection,
  removeSection,
  updateSection,
  addContentBlock,
  removeContentBlock,
  updateContentBlock,
  updateStayDates
} = newGuideSlice.actions;
export default newGuideSlice.reducer;