import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Button from '@material-ui/core/Button'
import CreateIcon from '@material-ui/icons/Create'
import { getImgOfObj } from '../utils/obj-functions'
import EpItemBar from './ep-item-bar.js'

const styles = theme => ({
  cardContent: {
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
    overflow: 'scroll',
    overflowY: 'hidden',
    // Promote the list into its own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  image: {
    left: '50%',
    top: 0,
    width: 'auto',
    height: '100%',
    transform: 'translateX(-50%)',
    maxHeight: 200,
  },
  tileRoot: {
    height: 'auto !important',
  },
  tileRootSmall: {
  },
  tileRootRed: {
    backgroundColor: 'red',
    height: 'auto !important',
  },
  tileRootRedSmall: {
    backgroundColor: 'red',
  },
  hidden: {
    display: 'none',
  },
  floatingButtonEdit: {
    margin: 0,
    bottom: 'auto',
    right: '-35%',
    top: '60%',
    left: 'auto',
    zIndex: 100,
    position: 'relative',
  },
})

const EpList = (props) => {
  const onClickEdit = (ev,inx) => {
    ev.stopPropagation()
    props.onEdit(inx)
  }
  const { classes, serie, curPlay, curEp, curPos, width, isPaused,
          usbPath, onSetPaused, onClickPlay, imgSrc, allowEdit, useHeight, largeScreen } = props
  let epList = []
  if ((serie!=null) && (serie.fileList!=null)) {
    epList = serie.fileList
  }
  let curEpInx = 0
  if (curEp!=null){
    curEpInx=curEp.id
  }
  let tmpPlayEp = undefined
  if (curPlay!=null){
    tmpPlayEp = curPlay.curEp
  }
  let colSize = 2.5
  //  let curHeight = useHeight-250
  let curHeight = 300
  if (width<=380){
    colSize = 1.1
    if (curHeight>300){
      curHeight = 300
    }
  }
console.log(curHeight)
  return (
    <CardContent className={classes.cardContent} >
      <GridList
        className={classes.gridList}
        style={{
          height: curHeight,
        }}
        cols={colSize}
      >
        {epList.map((ep,inx) => {
          let useImg = imgSrc
          if (ep.image!=null) {
            useImg = getImgOfObj(usbPath,ep)
          }
          const tileRootClass = (ep===tmpPlayEp) ? classes.tileRootRed : classes.tileRoot
          const tileRootClassSmall = (ep===tmpPlayEp) ? classes.tileRootRedSmall : classes.tileRootSmall
          return (
            <GridListTile
              key={inx}
              className={(width>=480) ? tileRootClass : tileRootClassSmall}
            >
              <Button
                onClick={(e) => {onClickEdit(e,inx)}}
                className={allowEdit ? classes.floatingButtonEdit : classes.hidden}
                color="primary"
                variant="contained"
              >
                <CreateIcon />
              </Button>
              <img src={useImg} alt={ep.title} className={classes.image}  />
              <EpItemBar
                isActive={(ep===tmpPlayEp)}
                partOfCurList={(inx<=curEpInx)}
                serie={serie}
                episode={ep}
                curPlay={curPlay}
                curPos={curPos}
                isPaused={isPaused}
                onSetPaused={onSetPaused}
                onClickPlay={(idStr) => onClickPlay(inx,idStr)}
              />
            </GridListTile>
          )}
        )}
      </GridList>
    </CardContent>
  )
}

EpList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(EpList)
