(ns eden.cube
  (:require [garden.color :refer [rgba]]
            [garden.def :refer [defcssfn defkeyframes defstyles]]
            [garden.units :refer [deg percent px]]))

(defcssfn rotateX)
(defcssfn rotateY)
(defcssfn translateZ)

(defstyles reset [:figure {:margin 0}])

(defkeyframes spin
  [:from ^:prefix {:transform (rotateY (deg 0))}]
  [:to ^:prefix {:transform (rotateY (deg 360))}])

(defstyles animation
  ^:prefix spin
  [:.spin
   {:cursor :pointer}
   ^:prefix {:transform-style :preserve-3d}]
  [:.spin:hover
   ^:prefix {:animation [[:spin :5s :linear :infinite]]}])

(defstyles cube
  [:.cube-container
   {:height (px 200)
    :width (px 200)
    :position :relative}
   ^:prefix {:perspective 300}]
  [:.cube
   {:height (percent 100)
    :width (percent 100)
    :position :absolute}
   ^:prefix {:transform (translateZ (px -100))
             :transform-style :preserve-3d}]
  [:.side
   {:height (px 196)
    :width (px 196)
    :position :absolute
    :background (rgba 142 198 63 0.3)
    :border [[(px 2) :solid "#8ec63f"]]
    :line-height (px 196)
    :font {:size (px 60)
           :weight :bold}
    :text {:align :center
           :shadow [[0 (px -1) 0 (rgba 0 0 0 0.2)]]
           :transform :uppercase}}])

(defn- transform
  ([class] [class ^:prefix {:transform (translateZ (px 100))}])
  ([class xy degs]
     [class ^:prefix {:transform [[((-> (str "rotate" xy)
                                        symbol
                                        resolve)
                                    (deg degs))
                                   (translateZ (px 100))]]}]))

(defstyles cube-faces
  (transform :.front)
  (transform :.back "X" 180)
  (transform :.left "Y" -90)
  (transform :.right "Y" 90)
  (transform :.top "X" 90)
  (transform :.bottom "X" -90))

(defstyles styles
  reset
  animation
  cube
  cube-faces)
